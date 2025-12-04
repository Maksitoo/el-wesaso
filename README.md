# Minecraft Server Website

Página web completa para servidor de Minecraft con sistema de base de datos y pagos integrado.

## 🚀 Características

- ✅ Autenticación de usuarios (registro, login, logout)
- ✅ Sistema de tienda con productos
- ✅ Integración con Stripe para pagos
- ✅ Base de datos MySQL
- ✅ Panel de administración
- ✅ Perfil de usuario
- ✅ Historial de compras
- ✅ API REST completa
- ✅ Seguridad: Helmet, Rate Limiting, XSS Protection
- ✅ Optimizado para producción
- ✅ Configuración con PM2
- ✅ Docker support

## 📋 Requisitos Previos

- Node.js 18+ 
- MySQL 5.7+ o MariaDB 10.3+
- Cuenta de Stripe (para pagos)

## 🚀 Despliegue Rápido (Recomendado)

**¿No quieres lidiar con cPanel?** Usa servicios gratuitos y fáciles:

- **Frontend**: Vercel (gratis, muy fácil)
- **Backend**: Railway o Render (gratis)
- **Base de datos**: MySQL incluido en Railway

👉 **Ver [DEPLOY_EASY.md](DEPLOY_EASY.md) para guía paso a paso**

---

## 🛠️ Instalación Manual

1. **Instalar dependencias:**
```bash
npm run install:all
```

2. **Configurar variables de entorno:**

**Producción (valhallamc.lat):**

Backend (`server/.env`):
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/minecraft-server
JWT_SECRET=tu_secreto_jwt_super_seguro
JWT_EXPIRE=7d
CLIENT_URL=https://valhallamc.lat
STRIPE_SECRET_KEY=sk_live_tu_clave_secreta
STRIPE_PUBLISHABLE_KEY=pk_live_tu_clave_publica
STRIPE_WEBHOOK_SECRET=whsec_tu_webhook_secret
MC_SERVER_IP=valhallamc.lat
```

Frontend (`client/.env.local`):
```env
NEXT_PUBLIC_API_URL=https://valhallamc.lat/api
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_tu_clave_publica
```

**Desarrollo Local:**

Backend (`server/.env`):
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/minecraft-server
JWT_SECRET=tu_secreto_jwt_super_seguro
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:3000
STRIPE_SECRET_KEY=sk_test_tu_clave_secreta
STRIPE_PUBLISHABLE_KEY=pk_test_tu_clave_publica
STRIPE_WEBHOOK_SECRET=whsec_tu_webhook_secret
```

Frontend (`client/.env.local`):
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_tu_clave_publica
```

3. **Iniciar MongoDB:**
```bash
# Si usas MongoDB local
mongod
```

4. **Ejecutar el proyecto:**
```bash
# Desarrollo (frontend + backend)
npm run dev

# O por separado:
npm run dev:server  # Backend en puerto 5000
npm run dev:client  # Frontend en puerto 3000
```

## 📁 Estructura del Proyecto

```
minecraft-server-website/
├── server/                 # Backend (Express + MongoDB)
│   ├── models/            # Modelos de base de datos
│   ├── routes/            # Rutas de la API
│   ├── middleware/        # Middleware (auth, etc.)
│   └── index.js           # Punto de entrada del servidor
├── client/                # Frontend (Next.js)
│   ├── app/               # Páginas y rutas
│   ├── components/        # Componentes React
│   ├── context/           # Context API
│   └── lib/               # Utilidades
└── package.json           # Scripts principales
```

## 🔑 Endpoints de la API

### Autenticación
- `POST /api/auth/register` - Registrar usuario
- `POST /api/auth/login` - Iniciar sesión
- `POST /api/auth/logout` - Cerrar sesión
- `GET /api/auth/me` - Obtener usuario actual

### Tienda
- `GET /api/shop/products` - Listar productos
- `GET /api/shop/products/:id` - Obtener producto
- `GET /api/shop/categories` - Listar categorías

### Pagos
- `POST /api/payments/create-intent` - Crear intent de pago
- `POST /api/payments/webhook` - Webhook de Stripe
- `GET /api/payments/purchases` - Obtener compras del usuario

### Admin
- `GET /api/admin/stats` - Estadísticas
- `POST /api/admin/products` - Crear producto
- `PUT /api/admin/products/:id` - Actualizar producto
- `DELETE /api/admin/products/:id` - Eliminar producto

## 💳 Configuración de Stripe

1. Crea una cuenta en [Stripe](https://stripe.com)
2. Obtén tus claves API (modo test para desarrollo)
3. Configura el webhook en el dashboard de Stripe:
   - URL: `https://valhallamc.lat/api/payments/webhook`
   - Eventos: `payment_intent.succeeded`

## 🗄️ Modelos de Base de Datos

### User
- username, email, password
- minecraftUsername, role
- balance, purchases
- isActive, lastLogin

### Product
- name, description, price
- category, image
- minecraftCommand
- stock, salesCount

### Purchase
- user, product, amount
- paymentMethod, paymentIntentId
- status, executed
- minecraftCommand

## 🔐 Roles de Usuario

- `user` - Usuario normal
- `moderator` - Moderador
- `admin` - Administrador

## 📝 Notas

- Los comandos de Minecraft se ejecutan cuando el pago se completa exitosamente
- Necesitarás conectar el webhook de Stripe a tu servidor de producción
- Ajusta los comandos de Minecraft según tu servidor

## 🔒 Seguridad

El proyecto incluye múltiples capas de seguridad:

- **Helmet**: Headers de seguridad HTTP
- **Rate Limiting**: Protección contra ataques de fuerza bruta
- **XSS Protection**: Sanitización de datos
- **MongoDB Sanitization**: Protección contra NoSQL injection
- **CORS**: Configuración restrictiva
- **JWT**: Tokens seguros con expiración
- **HTTPS**: SSL/TLS en producción

## 🚀 Despliegue a Producción

Para desplegar a producción, consulta la [Guía de Despliegue](DEPLOY.md).

### Scripts Útiles

```bash
# Generar secreto JWT seguro
npm run generate:secret

# Crear usuario administrador
npm run create:admin <email> <username> <password>

# Iniciar con PM2
npm run pm2:start

# Ver logs
pm2 logs
```

### Checklist de Producción

Antes de desplegar, revisa el [Checklist de Producción](PRODUCTION_CHECKLIST.md).

## 🐳 Docker

El proyecto incluye soporte para Docker:

```bash
# Construir y ejecutar
docker-compose up -d

# Ver logs
docker-compose logs -f

# Detener
docker-compose down
```

## 📝 Scripts Disponibles

- `npm run dev` - Desarrollo (frontend + backend)
- `npm run build` - Construir frontend para producción
- `npm run start` - Iniciar servidor de producción
- `npm run pm2:start` - Iniciar con PM2
- `npm run generate:secret` - Generar secreto JWT
- `npm run create:admin` - Crear usuario administrador

## 🚧 Próximos Pasos

- [ ] Panel de administración completo
- [ ] Sistema de notificaciones
- [ ] Integración con servidor de Minecraft
- [ ] Sistema de referidos
- [ ] Dashboard de estadísticas
- [ ] Sistema de cupones/descuentos

## 📄 Licencia

ISC

