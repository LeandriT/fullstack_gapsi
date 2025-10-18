import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SupplierService } from '../../services/supplier';
import { SupplierResponse } from '../../models/supplier_response.model';
import { PageResponse } from '../../../../core/models/base/page_response.model';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatChipsModule } from '@angular/material/chips';
import { Router } from '@angular/router';
import { SupplierStatus } from '../../../../core/enums/status.enum';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-supplier-list',
  templateUrl: './supplier-list.html',
  styleUrls: ['./supplier-list.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule, 
    MatPaginatorModule, 
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatChipsModule
  ]
})
export class SupplierList implements OnInit {

  pageResponse: PageResponse<SupplierResponse> = {
    content: [],
    pageable: {
      offset: 0,
      page_number: 0,
      page_size: 10,
      paged: true,
      sort: { empty: true, sorted: false, unsorted: true },
      unpaged: false
    },
    total_elements: 0,
    total_pages: 0,
    last: false,
    first: true,
    number_of_elements: 0,
    size: 10,
    number: 0,
    empty: false,
    sort: { empty: true, sorted: false, unsorted: true }
  };

  displayedColumns: string[] = ['name', 'business_name', 'address', 'email', 'phone', 'status', 'actions'];

  constructor(
    private supplierService: SupplierService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // ✅ Usar setTimeout para evitar el error de detección de cambios
    setTimeout(() => {
      this.loadSuppliers();
    }, 0);
  }

  loadSuppliers(page: number = 0, size: number = 10): void {
    this.supplierService.getSuppliers(page, size).subscribe({
      next: (suppliers) => {
        this.pageResponse = suppliers;
        this.cdr.detectChanges(); // ✅ Forzar detección de cambios
      },
      error: (error) => {
        console.error('Error al cargar proveedores:', error);
      }
    });
  }

  onPageChange(event: PageEvent): void {
    this.loadSuppliers(event.pageIndex, event.pageSize);
  }

  navigateToForm(): void {
    this.router.navigate(['/suppliers/form']);
  }

  viewSupplier(supplier: SupplierResponse): void {
    this.router.navigate(['/suppliers', supplier.uuid]);
  }

  editSupplier(supplier: SupplierResponse): void {
    this.router.navigate(['/suppliers/form', supplier.uuid]);
  }

  toggleStatus(supplier: SupplierResponse): void {
    const newStatus = supplier.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
    this.supplierService.updatePartialSupplier(supplier.uuid, SupplierStatus[newStatus]).subscribe({
      next: (supplier) => {
        this.pageResponse.content = this.pageResponse.content.map(s => s.uuid === supplier.uuid ? supplier : s);
        this.cdr.detectChanges(); // ✅ Forzar detección de cambios
      },
        error: (error) => {
          console.error('Error al cambiar estado:', error);
        }
      });
  }
  
  updateSupplier(supplier: SupplierResponse): void {
    this.router.navigate(['/suppliers/form'], { queryParams: { id: supplier.uuid } });
    this.supplierService.updateSupplier(supplier.uuid as string, supplier).subscribe({
      next: (supplier) => {
        this.pageResponse.content = this.pageResponse.content.map(s => s.uuid === supplier.uuid ? supplier : s);
        this.cdr.detectChanges(); // ✅ Forzar detección de cambios
      },
      error: (error) => {
        console.error('Error al actualizar proveedor:', error);
      }
    });
  }

  deleteSupplier(supplier: SupplierResponse): void {
    if (confirm(`¿Estás seguro de eliminar el proveedor "${supplier.name}"?`)) {
      this.supplierService.deleteSupplier(supplier.uuid as string).subscribe({
        next: () => {
          this.loadSuppliers(this.pageResponse.number, this.pageResponse.size);
        },
        error: (error) => {
          console.error('Error al eliminar proveedor:', error);
        }
      });
    }
  }
}