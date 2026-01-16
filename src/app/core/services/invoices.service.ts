/**
 * Invoices Service
 * Backend: InvoicesController
 * @see Accounting.Api.Controllers.InvoicesController
 */
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  InvoiceDto,
  InvoiceListItemDto,
  ListInvoicesQuery,
  CreateInvoiceBody,
  UpdateInvoiceBody,
  CreateInvoiceResult
} from '../models/invoice.models';
import { PagedResult } from '../models/paged-result';

@Injectable({ providedIn: 'root' })
export class InvoicesService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiBaseUrl}/invoices`;

  /**
   * POST /api/invoices
   */
  create(body: CreateInvoiceBody): Observable<CreateInvoiceResult> {
    return this.http.post<CreateInvoiceResult>(this.baseUrl, body);
  }

  /**
   * GET /api/invoices/{id}
   */
  getById(id: number): Observable<InvoiceDto> {
    return this.http.get<InvoiceDto>(`${this.baseUrl}/${id}`);
  }

  /**
   * GET /api/invoices
   */
  list(query: ListInvoicesQuery = {}): Observable<PagedResult<InvoiceListItemDto>> {
    let params = new HttpParams();
    if (query.pageNumber) params = params.set('pageNumber', query.pageNumber.toString());
    if (query.pageSize) params = params.set('pageSize', query.pageSize.toString());
    if (query.sort) params = params.set('sort', query.sort);
    if (query.branchId != null) params = params.set('branchId', query.branchId.toString());
    if (query.contactId != null) params = params.set('contactId', query.contactId.toString());
    if (query.type != null) params = params.set('type', query.type.toString());
    if (query.dateFromUtc) params = params.set('dateFromUtc', query.dateFromUtc);
    if (query.dateToUtc) params = params.set('dateToUtc', query.dateToUtc);
    return this.http.get<PagedResult<InvoiceListItemDto>>(this.baseUrl, { params });
  }

  /**
   * PUT /api/invoices/{id}
   */
  update(id: number, body: UpdateInvoiceBody): Observable<InvoiceDto> {
    return this.http.put<InvoiceDto>(`${this.baseUrl}/${id}`, body);
  }

  /**
   * DELETE /api/invoices/{id}
   */
  delete(id: number, rowVersion: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, {
      body: { rowVersion }
    });
  }

  /**
   * GET /api/invoices/export
   */
  export(query: ListInvoicesQuery = {}): Observable<Blob> {
    let params = new HttpParams();
    if (query.branchId != null) params = params.set('branchId', query.branchId.toString());
    if (query.contactId != null) params = params.set('contactId', query.contactId.toString());
    if (query.type != null) params = params.set('type', query.type.toString());
    if (query.dateFromUtc) params = params.set('dateFromUtc', query.dateFromUtc);
    if (query.dateToUtc) params = params.set('dateToUtc', query.dateToUtc);
    return this.http.get(`${this.baseUrl}/export`, { params, responseType: 'blob' });
  }
}
