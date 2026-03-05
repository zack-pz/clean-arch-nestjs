# Estructura del Proyecto

Clean Architecture y Screen architecture con NestJS - Organización modular por dominio

## Árbol de carpetas

```
src/
├── main.ts                          # Punto de entrada de la aplicación
├── app.module.ts                    # Módulo principal (solo importa feature modules)
├── app.service.ts                   # Servicio deprecado
├── app.controller.ts                # Controlador deprecado
├── app.controller.spec.ts           # Tests deprecados
│
└── modules/                         # Módulos por dominio
    │
    ├── order/                       # Dominio de Pedidos
    │   ├── domain/                  # Capa de Dominio (sin dependencias framework)
    │   │   ├── order.entity.ts      # Entidad Order
    │   │   └── order.repository.ts  # Interfaz del repositorio
    │   │
    │   ├── infrastructure/          # Capa de Infraestructura (@Injectable)
    │   │   └── persistence/
    │   │       └── order.in-memory.repository.ts  # Implementación en memoria
    │   │
    │   ├── application/             # Capa de Aplicación (orquestación)
    │   │   ├── dtos/
    │   │   │   └── create-order.dto.ts
    │   │   └── use-cases/
    │   │       └── create-order.use-case.ts
    │   │
    │   ├── presentation/            # Capa de Presentación (límite HTTP)
    │   │   └── order.controller.ts
    │   │
    │   └── order.module.ts          # Módulo que bindea dependencias
    │
    ├── product/                     # Dominio de Productos
    │   ├── domain/
    │   │   ├── product.entity.ts
    │   │   └── product.repository.ts
    │   │
    │   ├── infrastructure/
    │   │   └── persistence/
    │   │       └── product.in-memory.repository.ts
    │   │
    │   ├── application/             # Sin use cases aún
    │   │
    │   └── product.module.ts
    │
    └── user/                        # Dominio de Usuarios
        ├── domain/
        │   ├── user.entity.ts
        │   └── user.repository.ts
        │
        ├── infrastructure/
        │   └── persistence/
        │       └── user.in-memory.repository.ts
        │
        └── user.module.ts
```

## Patrón de capas por dominio

### Domain (Dominio)
- **Sin dependencias** de NestJS ni bases de datos
- Contiene: Entidades y interfaces de repositorios
- Usa Symbol tokens para inyección de dependencias

### Infrastructure (Infraestructura)
- Implementaciones concretas: BD, adapters, servicios externos
- Decoradores `@Injectable()` de NestJS
- Implementa interfaces definidas en `domain/`

### Application (Aplicación)
- Use cases: orquestación de lógica de negocio
- DTOs (Data Transfer Objects)
- Inyecta repositorios mediante Symbol tokens
- Sin preocupaciones HTTP

### Presentation (Presentación)
- Controllers: límite HTTP únicamente
- Transforman requests/responses
- Llaman a use cases

## Composición de módulos

```typescript
// order.module.ts
@Module({
  imports: [UserModule, ProductModule],  // Módulos requeridos
  providers: [CreateOrderUseCase, { provide: ORDER_REPOSITORY, useClass: ... }],
  exports: [ORDER_REPOSITORY]            // Token exportado
})
```

AppModule solo importa módulos top-level (feature modules), nunca directamente clases.

## Cambios recientes

- ✅ Implementación de Clean Architecture
- ✅ Tres dominios base: Order, Product, User
- ✅ Repositorios en memoria
- ✅ Estructura modular lista para extensión
