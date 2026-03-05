import { Module } from '@nestjs/common';
import { OrderModule } from './modules/order/order.module';

/**
 * AppModule solo compone módulos de alto nivel.
 * No registra repositorios ni casos de uso directamente.
 */
@Module({
  imports: [OrderModule],
})
export class AppModule {}
