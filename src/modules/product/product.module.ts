import { Module } from '@nestjs/common';
import { PRODUCT_REPOSITORY } from './domain/product.repository';
import { InMemoryProductRepository } from './infrastructure/persistence/product.in-memory.repository';

/**
 * ProductModule expone solo el token PRODUCT_REPOSITORY.
 * Swappear la BD (Postgres, Mongo, etc.) no requiere tocar ningún otro módulo.
 */
@Module({
  providers: [
    {
      provide: PRODUCT_REPOSITORY,
      useClass: InMemoryProductRepository,
    },
  ],
  exports: [PRODUCT_REPOSITORY],
})
export class ProductModule {}
