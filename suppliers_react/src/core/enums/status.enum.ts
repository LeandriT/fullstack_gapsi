export const SupplierStatus = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE'
} as const;

export type SupplierStatus = typeof SupplierStatus[keyof typeof SupplierStatus];

export const StatusLabels: Record<SupplierStatus, string> = {
  [SupplierStatus.ACTIVE]: 'Activo',
  [SupplierStatus.INACTIVE]: 'Inactivo'
};
