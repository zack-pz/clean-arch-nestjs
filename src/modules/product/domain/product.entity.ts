export class Product {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly price: number,
    public readonly stock: number,
  ) {}

  hasStock(quantity: number): boolean {
    return this.stock >= quantity;
  }
}
