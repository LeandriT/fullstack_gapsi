import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../../core/services/api';
import { VersionResponse } from '../../../../core/models/version-response.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.html',
  styleUrls: ['./welcome-page.scss'],
  standalone: false
})
export class WelcomePage implements OnInit {
  version$!: Observable<VersionResponse>;

  constructor(private router: Router, private apiService: ApiService) {}

  ngOnInit(): void {
    this.version$ = this.apiService.getVersion();
  }

  continuar(): void {
    this.router.navigate(['/suppliers']);
  }
}