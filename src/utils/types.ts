export enum EventStatus {
  PENDING = 'Pending',
  APPROVED = 'Approved',
  REJECTED = 'Rejected'
}

export interface SuccessResponse {
  status?: string
  data?: unknown
  message?: string
}

export interface DropdownObject {
  label: string
  value: string
}
