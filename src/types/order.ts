export type OrderStatus =
  | 'PENDING'
  | 'AWAITING_PAYMENT'
  | 'AWAITING_VERIFICATION'
  | 'PAID'
  | 'DELIVERED'
  | 'REFUNDED'
  | 'CANCELLED';

export interface Order {
  id: string;
  userId?: string;
  ign: string;
  edition: 'java' | 'bedrock';
  items: any[];
  total: number;
  currency: string;
  status: OrderStatus;
  paymentMethod: string;
  transactionId?: string;
  screenshot?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}
