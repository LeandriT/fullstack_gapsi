import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { VersionResponse } from '../models/version-response.model';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getVersion(): Observable<VersionResponse> {
    return this.http.get<VersionResponse>(`${this.baseUrl}/version/info`);
  }
}