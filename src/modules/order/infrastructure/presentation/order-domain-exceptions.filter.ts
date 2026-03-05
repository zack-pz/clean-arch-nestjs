import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import {
  UserNotFoundException,
  UserNotActiveException,
  ProductNotFoundException,
  InsufficientStockException,
} from '../../domain/exceptions';

type DomainException =
  | UserNotFoundException
  | UserNotActiveException
  | ProductNotFoundException
  | InsufficientStockException;

@Catch(UserNotFoundException, UserNotActiveException, ProductNotFoundException, InsufficientStockException)
export class OrderDomainExceptionsFilter implements ExceptionFilter {
  catch(exception: DomainException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const statusMap: Record<string, number> = {
      UserNotFoundException: HttpStatus.NOT_FOUND,
      UserNotActiveException: HttpStatus.FORBIDDEN,
      ProductNotFoundException: HttpStatus.NOT_FOUND,
      InsufficientStockException: HttpStatus.BAD_REQUEST,
    };

    const status = statusMap[exception.name] ?? HttpStatus.INTERNAL_SERVER_ERROR;

    response.status(status).json({
      statusCode: status,
      message: exception.message,
    });
  }
}
