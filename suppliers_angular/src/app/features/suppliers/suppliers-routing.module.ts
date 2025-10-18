import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const SUPPLIERS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/suppliers-page/suppliers-page.component').then(
        (m) => m.SuppliersPageComponent
      ),
  },
  {
    path: 'list',
    loadComponent: () =>
      import('./pages/supplier-list/supplier-list').then(
        (m) => m.SupplierList
      ),
  },
  {
    path: 'form',
    loadComponent: () =>
      import('./pages/supplier-form/supplier-form').then(
        (m) => m.SupplierForm
      ),
  },
  {
    path: 'form/:id', // ✅ Nueva ruta para editar con ID
    loadComponent: () =>
      import('./pages/supplier-form/supplier-form').then(
        (m) => m.SupplierForm
      ),
  },
];

// ✅ AGREGAR ESTO AL FINAL DEL ARCHIVO:
@NgModule({
  imports: [RouterModule.forChild(SUPPLIERS_ROUTES)],
  exports: [RouterModule]
})
export class SuppliersRoutingModule {}