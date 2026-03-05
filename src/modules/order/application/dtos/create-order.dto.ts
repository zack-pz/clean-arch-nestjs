export interface CreateOrderLineDto {
  productId: string;
  quantity: number;
}

export interface CreateOrderDto {
  userId: string;
  lines: CreateOrderLineDto[];
}

export interface CreateOrderResult {
  orderId: string;
  total: number;
  lines: Array<{
    productId: string;
    productName: string;
    quantity: number;
    unitPrice: number;
  }>;
}
