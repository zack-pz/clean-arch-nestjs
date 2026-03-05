import { Inject, Injectable, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { randomUUID } from 'crypto';

import { USER_REPOSITORY } from '../../../user/domain/user.repository';
import type { UserRepository } from '../../../user/domain/user.repository';
import { PRODUCT_REPOSITORY } from '../../../product/domain/product.repository';
import type { ProductRepository } from '../../../product/domain/product.repository';
import { ORDER_REPOSITORY } from '../../domain/order.repository';
import type { OrderRepository } from '../../domain/order.repository';
import { Order, OrderLine } from '../../domain/order.entity';
import { CreateOrderDto, CreateOrderResult } from '../dtos/create-order.dto';

/**
 * Un único caso de uso coordina tres repositorios de dominios distintos.
 * Cada repositorio se inyecta por su token (Symbol), no por la clase concreta,
 * manteniendo la inversión de dependencias (DIP) de Clean Architecture.
 */
@Injectable()
export class CreateOrderUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepo: UserRepository,

    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepo: ProductRepository,

    @Inject(ORDER_REPOSITORY)
    private readonly orderRepo: OrderRepository,
  ) {}

  async execute(dto: CreateOrderDto): Promise<CreateOrderResult> {
    // 1. Verificar que el usuario existe y cumple reglas de negocio (dominio User)
    const user = await this.userRepo.findById(dto.userId);
    if (!user) {
      throw new NotFoundException(`Usuario ${dto.userId} no encontrado`);
    }
    if (!user.canPlaceOrder()) {
      throw new ForbiddenException(`El usuario ${user.name} no está activo y no puede crear órdenes`);
    }

    // 2. Cargar todos los productos en una sola consulta (dominio Product)
    const productIds = dto.lines.map((l) => l.productId);
    const products = await this.productRepo.findManyByIds(productIds);
    const productMap = new Map(products.map((p) => [p.id, p]));

    // 3. Validar stock y construir las líneas de la orden
    const orderLines: OrderLine[] = [];
    for (const line of dto.lines) {
      const product = productMap.get(line.productId);
      if (!product) {
        throw new NotFoundException(`Producto ${line.productId} no encontrado`);
      }
      if (!product.hasStock(line.quantity)) {
        throw new BadRequestException(
          `Stock insuficiente para "${product.name}": disponible ${product.stock}, solicitado ${line.quantity}`,
        );
      }
      orderLines.push({
        productId: product.id,
        quantity: line.quantity,
        unitPrice: product.price,
      });
    }

    // 4. Crear y persistir la orden (dominio Order)
    const order = new Order(randomUUID(), user.id, orderLines);
    await this.orderRepo.save(order);

    return {
      orderId: order.id,
      total: order.total,
      lines: orderLines.map((l) => ({
        productId: l.productId,
        productName: productMap.get(l.productId)!.name,
        quantity: l.quantity,
        unitPrice: l.unitPrice,
      })),
    };
  }
}
