import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

import { SupplierStatus } from '../../../../core/enums/status.enum';
import { CommonModule } from '@angular/common';
import { SupplierService } from '../../services/supplier';
import { SupplierRequest } from '../../models/supplier_request.model';
import { SupplierResponse } from '../../models/supplier_response.model';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { NotificationService } from '../../../../core/services/notification.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandlerService } from '../../../../core/services/error-handler.service';
import { timeout, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
@Component({
  selector: 'app-supplier-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  templateUrl: './supplier-form.html',
  styleUrl: './supplier-form.scss'
})
export class SupplierForm implements OnInit {
  supplierForm!: FormGroup;
  statuses = Object.values(SupplierStatus);
  
  // ✅ Propiedades para manejar edición
  isEditMode = false;
  supplierId: string | null = null;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private supplierService: SupplierService,
    private router: Router,
    private route: ActivatedRoute,
    private notificationService: NotificationService,
    private errorHandler: ErrorHandlerService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    setTimeout(() => {
      this.checkEditMode();
    }, 0);
  }

  private initializeForm(): void {
    this.supplierForm = this.fb.group({
      name: ['', Validators.required],
      business_name: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', [Validators.email]],
      phone: [''],
      status: [SupplierStatus.ACTIVE, Validators.required]
    });
  }

  private checkEditMode(): void {
    // ✅ Verificar si estamos en modo edición
    this.supplierId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.supplierId;
    
    if (this.isEditMode && this.supplierId) {
      this.loadSupplierData();
    }
  }

  private loadSupplierData(): void {
    if (!this.supplierId) return;
    
    this.isLoading = true;
    this.cdr.detectChanges();
    
    this.supplierService.getSupplierById(this.supplierId)
      .pipe(
        timeout(10000),
        catchError((error) => {
          return of(null);
        })
      )
      .subscribe({
        next: (supplier: SupplierResponse | null) => {
          if (supplier) {
            this.supplierForm.patchValue({
              name: supplier.name,
              business_name: supplier.business_name,
              address: supplier.address,
              email: supplier.email,
              phone: supplier.phone,
              status: supplier.status
            });
          } else {
            this.notificationService.error('No se pudo cargar los datos del proveedor');
            this.router.navigate(['/suppliers']);
          }
          this.isLoading = false;
          this.cdr.detectChanges();
        },
        error: (error: HttpErrorResponse) => {
          this.errorHandler.handleError(error, 'Error al cargar datos del proveedor');
          this.isLoading = false;
          this.cdr.detectChanges();
          this.router.navigate(['/suppliers']);
        }
      });
  }

  onSubmit(): void {
    if (this.supplierForm.valid) {
      const supplier: SupplierRequest = this.supplierForm.value;
      
      if (this.isEditMode && this.supplierId) {
        this.updateSupplier(supplier);
      } else {
        this.createSupplier(supplier);
      }
    } else {
      this.supplierForm.markAllAsTouched();
    }
  }

  private createSupplier(supplier: SupplierRequest): void {
    this.supplierService.createSupplier(supplier).subscribe({
      next: (response) => {
        this.notificationService.success('Proveedor creado exitosamente');
        this.router.navigate(['/suppliers']);
      },
      error: (error: HttpErrorResponse) => {
        this.errorHandler.handleError(error, 'Error al crear proveedor');
      }
    });
  }

  private updateSupplier(supplier: SupplierRequest): void {
    if (!this.supplierId) return;
    
    this.supplierService.updateSupplier(this.supplierId, supplier).subscribe({
      next: (response) => {
        this.notificationService.success('Proveedor actualizado exitosamente');
        this.router.navigate(['/suppliers']);
      },
      error: (error: HttpErrorResponse) => {
        this.errorHandler.handleError(error, 'Error al actualizar proveedor');
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/suppliers']);
  }
}