/**
 * Invoice Models
 * 
 * Backend DTO'larıyla senkronize.
 * @see Accounting.Application.Invoices.Queries.Dto.InvoiceDtos
 */

// ============================================================================
// ENUMS
// ============================================================================

export enum InvoiceType {
  Sales = 1,
  Purchase = 2,
  SalesReturn = 3,
  PurchaseReturn = 4
}

export type InvoiceTypeStr = 'Sales' | 'Purchase' | 'SalesReturn' | 'PurchaseReturn';

export enum InvoiceTypeFilter {
  Any = 0,
  Sales = 1,
  Purchase = 2,
  SalesReturn = 3,
  PurchaseReturn = 4
}

// ============================================================================
// DTOs - READ (GET/LIST)
// ============================================================================

/**
 * Invoice Line DTO (Read)
 * Backend: InvoiceLineDto
 */
export interface InvoiceLineDto {
  id: number;
  itemId?: number | null;
  expenseDefinitionId?: number | null;
  itemCode: string;
  itemName: string;
  unit: string;
  qty: string;                    // F3 - Money string
  unitPrice: string;              // F4 - Money string
  vatRate: number;                // Percentage (0-100)
  discountRate: string;           // F2 - Money string
  discountAmount: string;         // F2 - Money string
  net: string;                    // F2 - Money string
  vat: string;                    // F2 - Money string
  withholdingRate: number;        // Percentage (0-100)
  withholdingAmount: string;      // F2 - Money string
  gross: string;                  // F2 - Money string
  grandTotal: string;             // F2 - Money string (Gross - Withholding)
}

/**
 * Invoice Detail DTO (Read)
 * Backend: InvoiceDto
 */
export interface InvoiceDto {
  id: number;
  contactId: number;
  contactCode: string;
  contactName: string;
  dateUtc: string;                // ISO-8601 UTC
  invoiceNumber: string;
  currency: string;               // "TRY", "USD", "EUR"
  
  // Totals
  totalLineGross: string;         // F2 - Sum of line gross amounts
  totalDiscount: string;          // F2 - Sum of discounts
  totalNet: string;               // F2 - Sum of net amounts
  totalVat: string;               // F2 - Sum of VAT
  totalWithholding: string;       // F2 - Sum of withholding
  totalGross: string;             // F2 - Net + VAT
  balance: string;                // F2 - Remaining unpaid amount
  
  // Lines
  lines: InvoiceLineDto[];
  
  // Metadata
  rowVersion: string;             // Base64
  createdAtUtc: string;           // ISO-8601 UTC
  updatedAtUtc?: string | null;   // ISO-8601 UTC
  
  // Type & Branch
  type: number;                   // InvoiceType enum as int
  branchId: number;
  branchCode: string;
  branchName: string;
  
  // Optional fields
  waybillNumber?: string | null;      // İrsaliye numarası
  waybillDateUtc?: string | null;     // ISO-8601 UTC
  paymentDueDateUtc?: string | null;  // ISO-8601 UTC - Vade tarihi
}

/**
 * Invoice List Item DTO (Read)
 * Backend: InvoiceListItemDto
 */
export interface InvoiceListItemDto {
  id: number;
  contactId: number;
  contactCode: string;
  contactName: string;
  type: string;                   // "Sales" | "Purchase" | "SalesReturn" | "PurchaseReturn"
  dateUtc: string;                // ISO-8601 UTC
  currency: string;
  totalNet: string;               // F2
  totalVat: string;               // F2
  totalGross: string;             // F2
  balance: string;                // F2 - Kalan bakiye
  createdAtUtc: string;           // ISO-8601 UTC
  branchId: number;
  branchCode: string;
  branchName: string;
}

// ============================================================================
// QUERY PARAMS
// ============================================================================

/**
 * List Invoices Query Parameters
 * Backend: ListInvoicesQuery
 */
export interface ListInvoicesQuery {
  pageNumber?: number;
  pageSize?: number;
  sort?: string;                      // "dateUtc:desc", "totalNet:asc"
  branchId?: number | null;
  contactId?: number | null;
  type?: InvoiceTypeFilter;
  dateFromUtc?: string | null;        // ISO-8601 UTC
  dateToUtc?: string | null;          // ISO-8601 UTC
}

// ============================================================================
// COMMAND BODIES - WRITE (CREATE/UPDATE)
// ============================================================================

/**
 * Create Invoice Line Body
 * Backend: CreateInvoiceRequest.LineDto
 */
export interface CreateInvoiceLineBody {
  id: 0;                              // Always 0 for new lines
  itemId?: number | null;
  expenseDefinitionId?: number | null;
  qty: string;                        // Money string (dot separator!)
  unitPrice: string;                  // Money string (dot separator!)
  vatRate: number;
  discountRate?: string;              // Money string (dot separator!)
  discountAmount?: string;            // Money string (dot separator!)
  withholdingRate?: number;
}

/**
 * Update Invoice Line Body
 * Backend: UpdateInvoiceRequest.LineDto
 */
export interface UpdateInvoiceLineBody {
  id: number;                         // Existing line ID (or 0 for new)
  itemId?: number | null;
  expenseDefinitionId?: number | null;
  qty: string;                        // Money string (dot separator!)
  unitPrice: string;                  // Money string (dot separator!)
  vatRate: number;
  discountRate?: string;              // Money string (dot separator!)
  discountAmount?: string;            // Money string (dot separator!)
  withholdingRate?: number;
}

/**
 * Create Invoice Body
 * Backend: CreateInvoiceRequest
 */
export interface CreateInvoiceBody {
  branchId: number;
  contactId: number;
  dateUtc: string;                    // ISO-8601 UTC
  currency: string;                   // "TRY", "USD", "EUR"
  type: InvoiceType | InvoiceTypeStr; // Enum or string
  invoiceNumber?: string;
  waybillNumber?: string;
  waybillDateUtc?: string;            // ISO-8601 UTC
  paymentDueDateUtc?: string;         // ISO-8601 UTC
  lines: CreateInvoiceLineBody[];
}

/**
 * Update Invoice Body
 * Backend: UpdateInvoiceRequest
 */
export interface UpdateInvoiceBody {
  id: number;
  rowVersionBase64: string;           // Required for optimistic concurrency
  branchId: number;
  contactId: number;
  dateUtc: string;                    // ISO-8601 UTC
  currency: string;                   // "TRY", "USD", "EUR"
  type: InvoiceType | InvoiceTypeStr; // Enum or string
  invoiceNumber?: string;
  waybillNumber?: string;
  waybillDateUtc?: string;            // ISO-8601 UTC
  paymentDueDateUtc?: string;         // ISO-8601 UTC
  lines: UpdateInvoiceLineBody[];
}

// ============================================================================
// RESPONSE MODELS
// ============================================================================

/**
 * Create Invoice Response
 * Backend: CreateInvoiceResponse
 */
export interface CreateInvoiceResult {
  id: number;
  rowVersionBase64: string;
}

// ============================================================================
// HELPER TYPES
// ============================================================================

/**
 * Helper type for invoice type conversion
 */
export function invoiceTypeToString(type: number): InvoiceTypeStr {
  switch (type) {
    case InvoiceType.Sales: return 'Sales';
    case InvoiceType.Purchase: return 'Purchase';
    case InvoiceType.SalesReturn: return 'SalesReturn';
    case InvoiceType.PurchaseReturn: return 'PurchaseReturn';
    default: return 'Sales';
  }
}

/**
 * Helper type for invoice type conversion
 */
export function invoiceTypeToNumber(type: InvoiceTypeStr): InvoiceType {
  switch (type) {
    case 'Sales': return InvoiceType.Sales;
    case 'Purchase': return InvoiceType.Purchase;
    case 'SalesReturn': return InvoiceType.SalesReturn;
    case 'PurchaseReturn': return InvoiceType.PurchaseReturn;
    default: return InvoiceType.Sales;
  }
}
