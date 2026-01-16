/**
 * Branches Service
 * 
 * Backend API Controller: BranchesController
 * @see Accounting.Api.Controllers.BranchesController
 */

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  BranchDto,
  CreateBranchBody,
  UpdateBranchBody
} from '../models/branch.models';

@Injectable({ providedIn: 'root' })
export class BranchesService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiBaseUrl}/branches`;

  /**
   * POST /api/branches
   * Create a new branch
   */
  create(body: CreateBranchBody): Observable<BranchDto> {
    return this.http.post<BranchDto>(this.baseUrl, body);
  }

  /**
   * GET /api/branches/{id}
   * Get branch by ID
   */
  getById(id: number): Observable<BranchDto> {
    return this.http.get<BranchDto>(`${this.baseUrl}/${id}`);
  }

  /**
   * GET /api/branches
   * List all branches (no pagination in backend)
   */
  list(): Observable<BranchDto[]> {
    return this.http.get<BranchDto[]>(this.baseUrl);
  }

  /**
   * PUT /api/branches/{id}
   * Update existing branch
   */
  update(id: number, body: UpdateBranchBody): Observable<BranchDto> {
    return this.http.put<BranchDto>(`${this.baseUrl}/${id}`, body);
  }

  /**
   * DELETE /api/branches/{id}
   * Delete branch
   * Note: Backend uses query param for rowVersion
   */
  delete(id: number, rowVersion: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, {
      params: { rowVersion }  // ⚠️ Query param, body değil!
    });
  }
}
