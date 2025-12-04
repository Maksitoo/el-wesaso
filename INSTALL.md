# Guía de Instalación

## Pasos Rápidos

### 1. Instalar Dependencias
```bash
npm run install:all
```

### 2. Configurar MongoDB

**Opción A: MongoDB Local**
```bash
# Instalar MongoDB (si no lo tienes)
# Windows: Descargar desde https://www.mongodb.com/try/download/community
# Mac: brew install mongodb-community
# Linux: sudo apt-get install mongodb

# Iniciar MongoDB
mongod
```

**Opción B: MongoDB Atlas (Recomendado para producción)**
1. Crear cuenta en https://www.mongodb.com/cloud/atlas
2. Crear un cluster gratuito
3. Obtener la cadena de conexión
4. Usarla en `MONGODB_URI`

### 3. Configurar Stripe

1. Crear cuenta en https://stripe.com
2. Ir a Developers > API keys
3. Copiar las claves de prueba (Test keys)
4. Configurar webhook:
   - URL: `https://valhallamc.lat/api/payments/webhook`
   - Evento: `payment_intent.succeeded`
   - Copiar el webhook secret

### 4. Configurar Variables de Entorno

**Producción (valhallamc.lat):**

**Backend** (`server/.env`):
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/minecraft-server
JWT_SECRET=genera_un_secreto_aleatorio_aqui
JWT_EXPIRE=7d
CLIENT_URL=https://valhallamc.lat
STRIPE_SECRET_KEY=sk_live_...
STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
MC_SERVER_IP=valhallamc.lat
```

**Frontend** (`client/.env.local`):
```env
NEXT_PUBLIC_API_URL=https://valhallamc.lat/api
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
```

**Desarrollo Local:**

**Backend** (`server/.env`):
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/minecraft-server
JWT_SECRET=genera_un_secreto_aleatorio_aqui
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:3000
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

**Frontend** (`client/.env.local`):
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

### 5. Ejecutar el Proyecto

```bash
# Desarrollo (ambos servidores)
npm run dev

# O por separado:
npm run dev:server  # Puerto 5000
npm run dev:client  # Puerto 3000
```

### 6. Acceder a la Aplicación

**Producción:**
- Frontend: https://valhallamc.lat
- Backend API: https://valhallamc.lat/api

**Desarrollo Local:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api

## Crear Usuario Administrador

Después de iniciar el servidor, puedes crear un usuario admin desde MongoDB:

```javascript
// En MongoDB shell o Compass
use minecraft-server
db.users.updateOne(
  { email: "tu-email@ejemplo.com" },
  { $set: { role: "admin" } }
)
```

## Solución de Problemas

### Error: "Cannot find module"
```bash
# Reinstalar dependencias
rm -rf node_modules
npm run install:all
```

### Error de conexión a MongoDB
- Verificar que MongoDB esté corriendo
- Verificar la URI en `.env`
- Si usas Atlas, verificar que tu IP esté en la whitelist

### Error de Stripe
- Verificar que las claves sean de prueba (test)
- Verificar que el webhook esté configurado correctamente

