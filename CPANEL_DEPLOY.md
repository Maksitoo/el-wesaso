# 🚀 Guía de Despliegue en cPanel (Spaceship)

## Configuración en cPanel Node.js Selector

### Paso 1: Crear la Aplicación Node.js

1. Ve a **cPanel > Node.js Selector > CREATE APPLICATION**

### Paso 2: Configurar los Campos

#### **Node.js version:**
- Selecciona **18.x** o superior (recomendado: la versión más reciente disponible)
- ⚠️ NO uses la versión 14.21.2 que aparece por defecto, necesitas Node.js 18+

#### **Application mode:**
- Selecciona **Production**

#### **Application root:**
- Ruta donde subirás los archivos de tu aplicación
- Ejemplo: `/home/tuusuario/nodejs/valhallamc` o `/home/tuusuario/public_html/valhallamc`
- ⚠️ Esta carpeta debe estar vacía o no existir aún

#### **Application URL:**
- Dominio: `valhallamc.lat`
- Subdirectorio: Deja vacío (para raíz) o `/api` si solo quieres el backend
- **Recomendación**: Deja vacío para la raíz del dominio

#### **Application startup file:**
- Ingresa: `server/index.js`
- Este es el archivo principal del backend

### Paso 3: Variables de Entorno

Haz clic en **"+ ADD VARIABLE"** y agrega estas variables una por una:

```
NODE_ENV=production
PORT=5000
DB_HOST=localhost
DB_PORT=3306
DB_NAME=minecraft_server
DB_USER=tu_usuario_mysql
DB_PASSWORD=tu_password_mysql
JWT_SECRET=tu_secreto_jwt_super_seguro_aqui
JWT_EXPIRE=7d
CLIENT_URL=https://valhallamc.lat
STRIPE_SECRET_KEY=sk_live_tu_clave_secreta
STRIPE_PUBLISHABLE_KEY=pk_live_tu_clave_publica
STRIPE_WEBHOOK_SECRET=whsec_tu_webhook_secret
MC_SERVER_IP=valhallamc.lat
MC_SERVER_PORT=25565
```

### Paso 4: Subir Archivos

1. Ve a **File Manager** en cPanel
2. Navega a la carpeta que especificaste en **Application root**
3. Sube todos los archivos del proyecto:
   - Carpeta `server/`
   - Carpeta `client/` (opcional si solo quieres backend)
   - `package.json` (raíz)
   - Archivos de configuración necesarios

### Paso 5: Instalar Dependencias

En cPanel Node.js Selector, después de crear la aplicación:

1. Ve a la aplicación creada
2. Busca la opción **"Run NPM Install"** o similar
3. O usa **Terminal** en cPanel y ejecuta:
   ```bash
   cd /ruta/a/tu/aplicacion
   npm install
   cd server
   npm install
   ```

### Paso 6: Construir Frontend (si incluyes el frontend)

Si también quieres desplegar el frontend en el mismo servidor:

1. En Terminal de cPanel:
   ```bash
   cd /ruta/a/tu/aplicacion/client
   npm install
   npm run build
   ```

### Paso 7: Iniciar la Aplicación

1. En **Node.js Selector**, busca tu aplicación
2. Haz clic en **"Start App"** o **"Restart App"**

## ⚠️ Consideraciones Importantes

### Opción 1: Solo Backend en cPanel
Si solo despliegas el backend en cPanel:
- **Application URL**: Deja vacío o usa `/api`
- El frontend lo puedes desplegar en otro lugar (Vercel, Netlify, etc.)
- O usar el frontend como sitio estático

### Opción 2: Backend + Frontend
Si quieres ambos en cPanel:
- Necesitarás configurar **dos aplicaciones Node.js**:
  1. **Backend**: `server/index.js` en puerto 5000
  2. **Frontend**: `client/server.js` (Next.js) en puerto 3000
- O usar **Next.js standalone build** y servir el frontend desde el backend

## 🔧 Configuración Recomendada para cPanel

### Estructura de Carpetas Sugerida

```
/home/tuusuario/
├── nodejs/
│   └── valhallamc/
│       ├── server/
│       │   ├── index.js
│       │   ├── package.json
│       │   └── ...
│       ├── client/
│       │   ├── .next/ (después del build)
│       │   └── ...
│       └── package.json
```

### Variables de Entorno Mínimas

Mínimo necesario para que funcione:
```
NODE_ENV=production
PORT=5000
MONGODB_URI=tu_uri_de_mongodb
JWT_SECRET=tu_secreto_seguro
CLIENT_URL=https://valhallamc.lat
STRIPE_SECRET_KEY=sk_live_...
STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

## 📝 Pasos Post-Despliegue

1. **Verificar que la app esté corriendo:**
   - Ve a `https://valhallamc.lat/api/health`
   - Debe responder: `{"status":"OK",...}`

2. **Configurar Webhook de Stripe:**
   - URL: `https://valhallamc.lat/api/payments/webhook`
   - Eventos: `payment_intent.succeeded`

3. **Crear usuario administrador:**
   - Usa Terminal en cPanel o SSH
   - Ejecuta: `node scripts/create-admin.js email@ejemplo.com admin password123`

## 🐛 Troubleshooting

### Error: "Cannot find module"
- Verifica que instalaste dependencias: `npm install` en `server/`
- Verifica que la ruta en **Application root** sea correcta

### Error: "Port already in use"
- Cambia el `PORT` en variables de entorno a otro puerto (ej: 5001)
- O verifica que no haya otra app usando el puerto

### La app no inicia
- Revisa los logs en cPanel Node.js Selector
- Verifica que `server/index.js` sea el archivo correcto
- Verifica que todas las variables de entorno estén configuradas

### Error de conexión a MySQL
- Verifica `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` en variables de entorno
- Verifica que el usuario tenga permisos en la base de datos
- Verifica que las tablas existan (importar `database.sql`)

## 💡 Tips

- **Node.js Version**: Siempre usa 18+ (no 14)
- **Application root**: Debe ser una ruta absoluta completa
- **Startup file**: Debe ser relativo a Application root
- **Variables de entorno**: Son sensibles, no las compartas
- **Logs**: Revisa los logs en cPanel para debugging

## 📞 Soporte

Si tienes problemas:
1. Revisa los logs en cPanel Node.js Selector
2. Verifica que todas las variables estén correctas
3. Asegúrate de que Node.js 18+ esté seleccionado

