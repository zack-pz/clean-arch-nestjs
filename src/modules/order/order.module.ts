import { Module } from '@nestjs/common';

// Importa módulos externos para obtener sus repositorios
import { UserModule } from '../user/user.module';
import { ProductModule } from '../product/product.module';

import { ORDER_REPOSITORY } from './domain/order.repository';
import { InMemoryOrderRepository } from './infrastructure/persistence/order.in-memory.repository';
import { CreateOrderUseCase } from './application/use-cases/create-order.use-case';
import { OrderController } from './infrastructure/presentation/order.controller';

/**
 * OrderModule importa UserModule y ProductModule para que NestJS
 * pueda resolver USER_REPOSITORY y PRODUCT_REPOSITORY al construir
 * CreateOrderUseCase. AppModule no necesita saber nada de esto.
 */
@Module({
  imports: [UserModule, ProductModule],
  providers: [
    {
      provide: ORDER_REPOSITORY,
      useClass: InMemoryOrderRepository,
    },
    CreateOrderUseCase,
  ],
  controllers: [OrderController],
})
export class OrderModule { }
