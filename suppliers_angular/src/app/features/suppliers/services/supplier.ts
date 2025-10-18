import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable, tap, catchError, throwError } from 'rxjs';
import { PageResponse } from '../../../core/models/base/page_response.model';
import { SupplierResponse } from '../models/supplier_response.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { SupplierRequest } from '../models/supplier_request.model';
import { SupplierStatus } from '../../../core/enums/status.enum';
import { ErrorHandlerService } from '../../../core/services/error-handler.service';

/**
 * Service Pattern Implementation
 * 
 * Este patrón centraliza la lógica de comunicación con APIs y proporciona
 * una interfaz consistente para operaciones HTTP en toda la aplicación.
 * 
 * Beneficios:
 * - Encapsula la lógica de peticiones HTTP
 * - Manejo centralizado de errores
 * - Reutilización de código
 * - Facilita testing con mocks
 */
@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  private baseUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlerService
  ) { }

  getSuppliers(page: number = 0, size: number = 10): Observable<PageResponse<SupplierResponse>> {
    return this.http.get<PageResponse<SupplierResponse>>(`${this.baseUrl}/suppliers?page=${page}&size=${size}`);
  }

  // ✅ Nuevo método para obtener un proveedor por ID
  getSupplierById(uuid: string): Observable<SupplierResponse> {
    return this.http.get<SupplierResponse>(`${this.baseUrl}/suppliers/${uuid}`);
  }

  createSupplier(supplier: SupplierRequest): Observable<SupplierResponse> {
    return this.http.post<SupplierResponse>(`${this.baseUrl}/suppliers`, supplier);
  }

  updateSupplier(uuid: string, supplier: SupplierRequest): Observable<SupplierResponse> {
    return this.http.put<SupplierResponse>(`${this.baseUrl}/suppliers/${uuid}`, supplier);
  }
  updatePartialSupplier(uuid: string, status: SupplierStatus): Observable<SupplierResponse> {
    return this.http.patch<SupplierResponse>(`${this.baseUrl}/suppliers/${uuid}`, { status: status });
  }

  deleteSupplier(uuid: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/suppliers/${uuid}`).pipe(
      tap(() => {

      })
    );
  }
}
