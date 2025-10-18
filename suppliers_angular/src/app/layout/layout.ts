import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';

@Component({
  selector: 'app-layout',
  standalone: false, // ✅ Correcto
  // ❌ ELIMINAR esta línea: imports: [RouterOutlet, Header, Footer],
  templateUrl: './layout.html',
  styleUrls: ['./layout.scss']
})
export class Layout {

}