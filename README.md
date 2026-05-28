# Backend Forge

Production-grade backend scaffolding and architecture automation CLI for modern Node.js systems.

---

## Features

- Interactive backend project generation
- MongoDB support
- Redis support
- BullMQ support
- Socket.IO support
- JWT authentication scaffolding
- Docker support
- Modular backend resource generation
- Optional CRUD module generation
- Automatic route registration
- Dynamic environment generation
- Smart feature dependency resolution
- Backend Forge project validation
- Architecture-aware backend wiring
- Optional architecture presets
- Swagger/OpenAPI generation
- Zod Validation

---

## Installation

Install globally:

```bash
npm install -g @michealadekunle/backend-forge
```

Or use directly with npx:

```bash
npx @michealadekunle/backend-forge create
```

---

## Commands

### Create Project

```bash
backend-forge create
```

### Generate Module

```bash
backend-forge generate module users
```

### Generate CRUD Module

```bash
backend-forge generate module products --crud
```

---


## Validation Example

Generated CRUD modules automatically include Zod validation.

Example generated validator:

```ts
export const createProductSchema = z.object({
  name: z.string().min(2),
});
```

Invalid requests automatically return structured validation errors.

---

## Presets

Backend Forge supports optional architecture presets.

### Realtime System

```bash
backend-forge create --preset realtime
```

Includes:

- MongoDB
- Redis
- Socket.IO
- JWT Authentication
- Docker

### Fintech API

```bash
backend-forge create --preset fintech
```

Includes:

- MongoDB
- Redis
- BullMQ
- JWT Authentication
- Docker

### Minimal API

```bash
backend-forge create --preset minimal
```

Includes:

- Base Express + TypeScript architecture only

---

## Quick Example

### Create Project

```bash
backend-forge create
```

### Generate Module

```bash
backend-forge generate module users
```

Generated automatically:

```txt
src/modules/users/
├── users.controller.ts
├── users.service.ts
├── users.routes.ts
├── users.types.ts
└── users.validator.ts
```

Routes are automatically registered in:

```txt
src/routes/index.ts
```

---

## CRUD Example

```bash
backend-forge generate module products --crud
```

Generated endpoints:

```txt
GET    /products
GET    /products/:id
POST   /products
PATCH  /products/:id
DELETE /products/:id
```

---

## Generated Features

Backend Forge can generate:

- MongoDB architecture
- Redis configuration
- BullMQ queues/workers
- Socket.IO setup
- JWT middleware
- Docker setup
- Modular backend resources
- CRUD-ready controllers and routes

---

## Example Workflow

```bash
backend-forge create --preset fintech

cd my-project

npm install

backend-forge generate module payments --crud

npm run dev
```

---

## Roadmap

- Prisma/PostgreSQL support
- Authentication presets
- Microservice architecture templates
- Plugin ecosystem
- Testing generators
- CI/CD scaffolding

---

## License

MIT