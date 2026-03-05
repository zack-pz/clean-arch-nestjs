export interface OrderLine {
  productId: string;
  quantity: number;
  unitPrice: number;
}

export class Order {
  public readonly total: number;

  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly lines: OrderLine[],
    public readonly createdAt: Date = new Date(),
  ) {
    this.total = lines.reduce(
      (sum, line) => sum + line.unitPrice * line.quantity,
      0,
    );
  }
}
