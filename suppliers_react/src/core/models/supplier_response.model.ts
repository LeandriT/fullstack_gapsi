export interface SupplierResponse {
  uuid: string;
  name: string;
  business_name: string;
  address: string;
  email?: string | null;
  phone?: string | null;
  status: string;
  created_at?: string;
  updated_at?: string;
}
