import { Injectable } from '@nestjs/common';
import { Product } from '../../domain/product.entity';
import { ProductRepository } from '../../domain/product.repository';

@Injectable()
export class InMemoryProductRepository implements ProductRepository {
  private readonly store = new Map<string, Product>([
    ['prod-1', new Product('prod-1', 'Laptop', 1200, 10)],
    ['prod-2', new Product('prod-2', 'Mouse', 25, 50)],
    ['prod-3', new Product('prod-3', 'Keyboard', 80, 0)],
  ]);

  async findById(id: string): Promise<Product | null> {
    return this.store.get(id) ?? null;
  }

  async findManyByIds(ids: string[]): Promise<Product[]> {
    return ids.map((id) => this.store.get(id)).filter(Boolean) as Product[];
  }
}
