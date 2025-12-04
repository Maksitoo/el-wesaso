# ⚙️ Configuración Exacta para cPanel Node.js

## Valores para Completar el Formulario

### 📋 Campos del Formulario

#### 1. **Node.js version:**
```
18.x o superior (NO uses 14.21.2)
```
- ⚠️ **IMPORTANTE**: Cambia de 14.21.2 a la versión 18.x o superior
- Si no aparece 18+, contacta al soporte de Spaceship

#### 2. **Application mode:**
```
Production ✅ (ya está correcto)
```

#### 3. **Application root:**
```
/home/tuusuario/nodejs/valhallamc
```
- Reemplaza `tuusuario` con tu usuario de cPanel
- O usa: `/home/tuusuario/public_html/valhallamc`
- Esta carpeta debe existir o se creará automáticamente

#### 4. **Application URL:**
- **Dropdown (dominio)**: `valhallamc.lat` ✅ (ya está seleccionado)
- **Campo de texto (subdirectorio)**: **DEJA VACÍO** (para raíz del dominio)
  - O si solo quieres el backend: `/api`

#### 5. **Application startup file:**
```
server/index.js
```

### 🔐 Variables de Entorno

Haz clic en **"+ ADD VARIABLE"** y agrega estas variables:

```
NODE_ENV=production
PORT=5000
DB_HOST=localhost
DB_PORT=3306
DB_NAME=minecraft_server
DB_USER=tu_usuario_mysql
DB_PASSWORD=tu_password_mysql
JWT_SECRET=GENERA_UN_SECRETO_AQUI_USA_EL_SCRIPT
JWT_EXPIRE=7d
CLIENT_URL=https://valhallamc.lat
STRIPE_SECRET_KEY=sk_live_tu_clave_secreta
STRIPE_PUBLISHABLE_KEY=pk_live_tu_clave_publica
STRIPE_WEBHOOK_SECRET=whsec_tu_webhook_secret
MC_SERVER_IP=valhallamc.lat
MC_SERVER_PORT=25565
```

## 📝 Pasos Después de Crear la Aplicación

### 1. Subir Archivos
1. Ve a **File Manager** en cPanel
2. Navega a la carpeta que pusiste en **Application root**
3. Sube todos los archivos del proyecto:
   - Carpeta `server/` completa
   - Carpeta `client/` completa (opcional)
   - `package.json` de la raíz
   - Archivos de configuración

### 2. Instalar Dependencias
En cPanel, busca la opción **Terminal** o **SSH Access** y ejecuta:

```bash
cd /home/tuusuario/nodejs/valhallamc
npm install
cd server
npm install
```

### 3. Construir Frontend (si lo incluyes)
```bash
cd /home/tuusuario/nodejs/valhallamc/client
npm install
npm run build
```

### 4. Iniciar la Aplicación
1. Vuelve a **Node.js Selector**
2. Busca tu aplicación `valhallamc`
3. Haz clic en **"Start App"** o **"Restart App"**

## ✅ Verificación

Después de iniciar, verifica:
- `https://valhallamc.lat/api/health` debe responder con `{"status":"OK"}`

## ⚠️ Notas Importantes

1. **Node.js 18+**: Es CRÍTICO que uses Node.js 18 o superior, NO 14
2. **Application root**: Debe ser una ruta absoluta completa
3. **Startup file**: Es relativo a Application root, por eso `server/index.js`
4. **Variables de entorno**: Son sensibles, no las compartas públicamente

## 🐛 Si Tienes Problemas

- **Error de puerto**: Cambia `PORT=5000` a otro puerto (5001, 5002, etc.)
- **No encuentra módulos**: Verifica que instalaste dependencias en `server/`
- **App no inicia**: Revisa los logs en Node.js Selector

