import { Injectable } from '@nestjs/common';
import { Order } from '../../domain/order.entity';
import { OrderRepository } from '../../domain/order.repository';

@Injectable()
export class InMemoryOrderRepository implements OrderRepository {
  private readonly store = new Map<string, Order>();

  async save(order: Order): Promise<void> {
    this.store.set(order.id, order);
  }

  async findById(id: string): Promise<Order | null> {
    return this.store.get(id) ?? null;
  }

  async findByUserId(userId: string): Promise<Order[]> {
    return [...this.store.values()].filter((o) => o.userId === userId);
  }
}
