import { Component, OnInit } from '@angular/core';
import { SupplierList } from '../supplier-list/supplier-list';
import { SupplierForm } from '../supplier-form/supplier-form';

@Component({
  selector: 'app-suppliers-page',
  templateUrl: './suppliers-page.component.html',
  styleUrls: ['./suppliers-page.component.scss'],
  standalone: true,
  imports: [SupplierList] 
})
export class SuppliersPageComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
  }  
}