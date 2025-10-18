import api from '../api/axios';
import type { SupplierRequest } from '../models/supplier_request.model';
import type { SupplierResponse } from '../models/supplier_response.model';
import type { PageResponse } from '../models/page_response.model';
import type { VersionResponse } from '../models/version_response.model';

export const SupplierService = {
  // List suppliers with pagination
  list: (page = 0, size = 10) =>
    api.get<PageResponse<SupplierResponse>>(`/suppliers?page=${page}&size=${size}`),
  
  // Get supplier by ID
  getById: (uuid: string) =>
    api.get<SupplierResponse>(`/suppliers/${uuid}`),
  
  // Create new supplier
  create: (payload: SupplierRequest) =>
    api.post<SupplierResponse>('/suppliers', payload),
  
  // Update supplier
  update: (uuid: string, payload: SupplierRequest) =>
    api.put<SupplierResponse>(`/suppliers/${uuid}`, payload),
  
  // Partial update (status only)
  partialUpdate: (uuid: string, status: string) =>
    api.patch<SupplierResponse>(`/suppliers/${uuid}`, { status }),
  
  // Delete supplier
  delete: (uuid: string) =>
    api.delete<void>(`/suppliers/${uuid}`),
  
  // Get version info
  getVersion: () =>
    api.get<VersionResponse>('/version/info')
};
