// =============================================================================
// CASH BANK ACCOUNTS SERVICE
// =============================================================================
/**
 * Cash Bank Accounts Service
 * Backend: CashBankAccountsController
 */

import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  CashBankAccountListItemDto,
  CashBankAccountDetailDto,
  ListCashBankAccountsQuery,
  CreateCashBankAccountBody,
  UpdateCashBankAccountBody
} from '../models/cash-bank-account.models';
import { PagedResult } from '../models/paged-result';

@Injectable({ providedIn: 'root' })
export class CashBankAccountsService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiBaseUrl}/cash-bank-accounts`;

  create(body: CreateCashBankAccountBody): Observable<CashBankAccountDetailDto> {
    return this.http.post<CashBankAccountDetailDto>(this.baseUrl, body);
  }

  getById(id: number): Observable<CashBankAccountDetailDto> {
    return this.http.get<CashBankAccountDetailDto>(`${this.baseUrl}/${id}`);
  }

  list(query: ListCashBankAccountsQuery = {}): Observable<PagedResult<CashBankAccountListItemDto>> {
    let params = new HttpParams();
    if (query.type != null) params = params.set('type', query.type.toString());
    if (query.branchId != null) params = params.set('branchId', query.branchId.toString());
    if (query.pageNumber) params = params.set('page', query.pageNumber.toString());
    if (query.pageSize) params = params.set('pageSize', query.pageSize.toString());
    if (query.sort) params = params.set('sort', query.sort);
    return this.http.get<PagedResult<CashBankAccountListItemDto>>(this.baseUrl, { params });
  }

  update(id: number, body: UpdateCashBankAccountBody): Observable<CashBankAccountDetailDto> {
    return this.http.put<CashBankAccountDetailDto>(`${this.baseUrl}/${id}`, body);
  }

  delete(id: number, rowVersionBase64: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, {
      body: { id, rowVersionBase64 }
    });
  }
}

// =============================================================================
// BRANCHES SERVICE
// =============================================================================
/**
 * Branches Service
 * Backend: BranchesController
 */

import { BranchDto, ListBranchesQuery, CreateBranchBody, UpdateBranchBody } from '../models/branch.models';

@Injectable({ providedIn: 'root' })
export class BranchesService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiBaseUrl}/branches`;

  create(body: CreateBranchBody): Observable<BranchDto> {
    return this.http.post<BranchDto>(this.baseUrl, body);
  }

  getById(id: number): Observable<BranchDto> {
    return this.http.get<BranchDto>(`${this.baseUrl}/${id}`);
  }

  list(query: ListBranchesQuery = {}): Observable<BranchDto[]> {
    let params = new HttpParams();
    if (query.pageNumber) params = params.set('page', query.pageNumber.toString());
    if (query.pageSize) params = params.set('pageSize', query.pageSize.toString());
    if (query.sort) params = params.set('sort', query.sort);
    return this.http.get<BranchDto[]>(this.baseUrl, { params });
  }

  update(id: number, body: UpdateBranchBody): Observable<BranchDto> {
    return this.http.put<BranchDto>(`${this.baseUrl}/${id}`, body);
  }

  delete(id: number, rowVersionBase64: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, {
      body: { rowVersionBase64 }
    });
  }
}

// =============================================================================
// CATEGORIES SERVICE
// =============================================================================
/**
 * Categories Service
 * Backend: CategoriesController
 */

import { CategoryDto, ListCategoriesQuery, CreateCategoryBody, UpdateCategoryBody } from '../models/category.models';

@Injectable({ providedIn: 'root' })
export class CategoriesService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiBaseUrl}/categories`;

  create(body: CreateCategoryBody): Observable<CategoryDto> {
    return this.http.post<CategoryDto>(this.baseUrl, body);
  }

  list(query: ListCategoriesQuery = {}): Observable<CategoryDto[]> {
    let params = new HttpParams();
    if (query.search) params = params.set('search', query.search);
    if (query.pageNumber) params = params.set('page', query.pageNumber.toString());
    if (query.pageSize) params = params.set('pageSize', query.pageSize.toString());
    if (query.sort) params = params.set('sort', query.sort);
    return this.http.get<CategoryDto[]>(this.baseUrl, { params });
  }

  update(id: number, body: UpdateCategoryBody): Observable<CategoryDto> {
    return this.http.put<CategoryDto>(`${this.baseUrl}/${id}`, body);
  }

  delete(id: number, rowVersionBase64: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, {
      body: { rowVersionBase64 }
    });
  }
}
