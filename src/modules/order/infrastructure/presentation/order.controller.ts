import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import { CreateOrderUseCase } from '../../application/use-cases/create-order.use-case';
import type { CreateOrderDto } from '../../application/dtos/create-order.dto';
import { OrderDomainExceptionsFilter } from './order-domain-exceptions.filter';

@UseFilters(OrderDomainExceptionsFilter)
@Controller('orders')
export class OrderController {
  constructor(private readonly createOrder: CreateOrderUseCase) { }

  @Post()
  create(@Body() dto: CreateOrderDto) {
    return this.createOrder.execute(dto);
  }
}
