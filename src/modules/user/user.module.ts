import { Module } from '@nestjs/common';
import { USER_REPOSITORY } from './domain/user.repository';
import { InMemoryUserRepository } from './infrastructure/persistence/user.in-memory.repository';

/**
 * UserModule encapsula todo lo relacionado al dominio User.
 * Exporta únicamente el token USER_REPOSITORY para que otros módulos
 * puedan inyectarlo sin conocer la implementación concreta.
 */
@Module({
  providers: [
    {
      provide: USER_REPOSITORY,
      useClass: InMemoryUserRepository,
    },
  ],
  exports: [USER_REPOSITORY],
})
export class UserModule {}
