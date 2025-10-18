import type { SupplierStatus } from '../enums/status.enum';

export interface SupplierRequest {
  name: string;
  business_name: string;
  address: string;
  email?: string | null;
  phone?: string | null;
  status: SupplierStatus;
}
