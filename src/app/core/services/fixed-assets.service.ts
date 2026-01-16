/**
 * FixedAssets Service
 * Backend: FixedAssetsController
 */

import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { PagedResult } from '../models/paged-result';

@Injectable({ providedIn: 'root' })
export class FixedAssetsService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiBaseUrl}/fixed-assets`;

  // TODO: Add specific methods based on controller endpoints
  // Template methods below - customize as needed:

  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  list(params?: any): Observable<any> {
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(key => {
        if (params[key] != null) {
          httpParams = httpParams.set(key, params[key].toString());
        }
      });
    }
    return this.http.get<any>(this.baseUrl, { params: httpParams });
  }

  create(body: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, body);
  }

  update(id: number, body: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, body);
  }

  delete(id: number, rowVersion?: string): Observable<void> {
    const body = rowVersion ? { rowVersion } : undefined;
    return this.http.delete<void>(`${this.baseUrl}/${id}`, { body });
  }
}
