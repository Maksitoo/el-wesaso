# 🚀 Despliegue Fácil - Sin cPanel

> ⚠️ **¿Nunca has usado esto?** Ve a [GUIA_COMPLETA_PASO_A_PASO.md](GUIA_COMPLETA_PASO_A_PASO.md) para una guía detallada desde cero.

# 🚀 Despliegue Fácil - Sin cPanel

## Opción 1: Vercel (Frontend) + Railway/Render (Backend) ⭐ RECOMENDADO

### Frontend en Vercel (GRATIS y MUY FÁCIL)

1. **Sube tu código a GitHub:**
   - Crea una cuenta en GitHub.com
   - Crea un nuevo repositorio
   - Sube todos los archivos del proyecto

2. **Despliega en Vercel:**
   - Ve a https://vercel.com
   - Inicia sesión con GitHub
   - Haz clic en "Add New Project"
   - Selecciona tu repositorio
   - **Root Directory**: Selecciona `client`
   - **Framework Preset**: Next.js (se detecta automáticamente)
   - **Environment Variables**:
     ```
     NEXT_PUBLIC_API_URL=https://tu-backend.railway.app/api
     NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
     ```
   - Haz clic en "Deploy"
   - ¡Listo! Tu frontend estará en línea en 2 minutos

### Backend en Railway (GRATIS con límite)

1. **Ve a Railway:**
   - https://railway.app
   - Inicia sesión con GitHub

2. **Crea nuevo proyecto:**
   - "New Project" > "Deploy from GitHub repo"
   - Selecciona tu repositorio
   - Selecciona la carpeta `server`

3. **Configura variables de entorno:**
   - Ve a "Variables"
   - Agrega todas las variables de `server/.env`:
     ```
     NODE_ENV=production
     PORT=5000
     DB_HOST=...
     DB_USER=...
     DB_PASSWORD=...
     DB_NAME=...
     JWT_SECRET=...
     CLIENT_URL=https://tu-frontend.vercel.app
     STRIPE_SECRET_KEY=...
     STRIPE_WEBHOOK_SECRET=...
     ```

4. **Base de datos MySQL:**
   - En Railway, haz clic en "New" > "Database" > "MySQL"
   - Railway creará la base de datos automáticamente
   - Usa las credenciales que te da Railway en las variables de entorno

5. **¡Listo!** Railway desplegará automáticamente

### Backend en Render (Alternativa GRATIS)

1. **Ve a Render:**
   - https://render.com
   - Inicia sesión con GitHub

2. **Crea nuevo Web Service:**
   - "New" > "Web Service"
   - Conecta tu repositorio de GitHub
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Start Command**: `node index.js`
   - **Environment**: Node

3. **Configura variables de entorno** (igual que Railway)

4. **Base de datos:**
   - "New" > "PostgreSQL" (gratis) o "MySQL" (si está disponible)
   - O usa una base de datos externa como PlanetScale (MySQL gratis)

---

## Opción 2: Todo en Vercel (Más Simple)

Vercel puede manejar tanto frontend como backend con Serverless Functions.

### Pasos:

1. **Sube a GitHub** (igual que arriba)

2. **Despliega en Vercel:**
   - Conecta el repositorio completo
   - **Root Directory**: deja vacío (raíz del proyecto)
   - Vercel detectará automáticamente Next.js

3. **Configura:**
   - Las rutas `/api/*` se convertirán automáticamente en serverless functions
   - Necesitarás adaptar el código un poco (pero es mínimo)

4. **Base de datos:**
   - Usa PlanetScale (MySQL gratis) o Supabase (PostgreSQL gratis)
   - Obtén las credenciales y agrégalas a variables de entorno

---

## Opción 3: Render (Todo en uno) - MÁS FÁCIL

Render puede manejar todo: frontend, backend y base de datos.

### Pasos:

1. **Sube a GitHub**

2. **Frontend en Render:**
   - "New" > "Static Site"
   - Conecta repositorio
   - **Root Directory**: `client`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `client/.next`

3. **Backend en Render:**
   - "New" > "Web Service"
   - Conecta repositorio
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Start Command**: `node index.js`

4. **Base de datos:**
   - "New" > "PostgreSQL" (gratis)
   - O usa MySQL externo (PlanetScale)

---

## 🎯 Recomendación: Vercel + Railway

**Por qué:**
- ✅ Vercel es el mejor para Next.js (lo crearon ellos)
- ✅ Railway es muy fácil de usar
- ✅ Ambos tienen planes gratuitos generosos
- ✅ Despliegue automático desde GitHub
- ✅ No necesitas tocar servidores

**Tiempo estimado:** 15-20 minutos total

---

## 📝 Checklist Rápido

### Frontend (Vercel):
- [ ] Código en GitHub
- [ ] Cuenta en Vercel
- [ ] Conectar repositorio
- [ ] Configurar variables de entorno
- [ ] Deploy

### Backend (Railway):
- [ ] Cuenta en Railway
- [ ] Conectar repositorio
- [ ] Crear base de datos MySQL
- [ ] Configurar variables de entorno
- [ ] Deploy

### Base de Datos:
- [ ] Crear MySQL en Railway
- [ ] Importar `database.sql` (desde phpMyAdmin o terminal)
- [ ] Obtener credenciales

---

## 🆘 Si Necesitas Ayuda

1. **Vercel tiene excelente documentación:** https://vercel.com/docs
2. **Railway tiene guías paso a paso:** https://docs.railway.app
3. **Render también tiene tutoriales:** https://render.com/docs

---

## 💡 Ventajas vs cPanel

| cPanel | Vercel/Railway |
|--------|----------------|
| ❌ Complicado | ✅ Muy fácil |
| ❌ Terminal manual | ✅ Automático |
| ❌ Configuración manual | ✅ Con un clic |
| ❌ Actualizaciones manuales | ✅ Auto-deploy desde GitHub |
| ✅ Control total | ✅ Sin preocuparte de servidores |

**¿Quieres que te guíe paso a paso con alguna de estas opciones?**

