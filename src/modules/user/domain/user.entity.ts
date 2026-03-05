export class User {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly email: string,
    public readonly isActive: boolean = true,
    public readonly isAdmin: boolean = false,
  ) {}

  /** Regla de negocio: solo usuarios activos pueden crear órdenes. */
  canPlaceOrder(): boolean {
    return this.isActive;
  }

  /** Regla de negocio: los admins pueden operar en nombre de otros usuarios. */
  canActOnBehalfOfOthers(): boolean {
    return this.isAdmin && this.isActive;
  }
}
