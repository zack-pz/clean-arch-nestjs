import { User } from './user.entity';

// Token de inyección — desacopla la interfaz de la implementación concreta
export const USER_REPOSITORY = Symbol('USER_REPOSITORY');

export interface UserRepository {
  findById(id: string): Promise<User | null>;
  save(user: User): Promise<void>;
}
