import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Layout } from './layout';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';

@NgModule({
  declarations: [Layout], // ✅ Declarar el componente Layout
  imports: [
    CommonModule,
    RouterModule,
    Header, // ✅ Importar Header
    Footer  // ✅ Importar Footer
  ],
  exports: [Layout] // ✅ Exportar Layout
})
export class LayoutModule { }