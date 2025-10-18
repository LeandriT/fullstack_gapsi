
import { SupplierStatus } from "../../../core/enums/status.enum";
import { BaseDto } from "../../../core/models/base/base.model";

export interface SupplierResponse extends BaseDto {
    name: string;
    business_name: string; // Jackson convierte businessName a business_name
    address: string;
    email: string | null;
    phone: string | null;
    status: SupplierStatus;
  }