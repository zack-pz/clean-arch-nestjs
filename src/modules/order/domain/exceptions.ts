export class UserNotFoundException extends Error {
  constructor(userId: string) {
    super(`Usuario ${userId} no encontrado`);
    this.name = 'UserNotFoundException';
  }
}

export class UserNotActiveException extends Error {
  constructor(userName: string) {
    super(`El usuario ${userName} no está activo y no puede crear órdenes`);
    this.name = 'UserNotActiveException';
  }
}

export class ProductNotFoundException extends Error {
  constructor(productId: string) {
    super(`Producto ${productId} no encontrado`);
    this.name = 'ProductNotFoundException';
  }
}

export class InsufficientStockException extends Error {
  constructor(productName: string, available: number, requested: number) {
    super(`Stock insuficiente para "${productName}": disponible ${available}, solicitado ${requested}`);
    this.name = 'InsufficientStockException';
  }
}
