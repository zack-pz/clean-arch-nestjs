import { Injectable } from '@nestjs/common';
import { User } from '../../domain/user.entity';
import { UserRepository } from '../../domain/user.repository';

// Solo esta capa importa NestJS — el dominio permanece agnóstico al framework
@Injectable()
export class InMemoryUserRepository implements UserRepository {
  private readonly store = new Map<string, User>([
    ['user-1', new User('user-1', 'Alice', 'alice@example.com', true, false)],
    ['user-2', new User('user-2', 'Bob', 'bob@example.com', false, false)],  // inactivo
    ['user-3', new User('user-3', 'Carol', 'carol@example.com', true, true)], // admin
  ]);

  async findById(id: string): Promise<User | null> {
    return this.store.get(id) ?? null;
  }

  async save(user: User): Promise<void> {
    this.store.set(user.id, user);
  }
}
