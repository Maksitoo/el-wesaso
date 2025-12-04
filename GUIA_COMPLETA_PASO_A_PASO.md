# 🎯 Guía Completa Paso a Paso - Desde Cero

## 📋 Lo que vamos a hacer

1. Subir tu código a GitHub (almacenamiento en la nube)
2. Desplegar el Frontend en Vercel (tu página web)
3. Desplegar el Backend en Railway (tu servidor)
4. Configurar la base de datos MySQL
5. Conectar todo junto

**Tiempo estimado:** 30-45 minutos (la primera vez)

---

## PASO 1: Crear cuenta en GitHub

### ¿Qué es GitHub?
Es como Google Drive pero para código. Guardaremos tu proyecto allí.

### Pasos:

1. **Ve a:** https://github.com
2. **Haz clic en "Sign up"** (arriba a la derecha)
3. **Crea tu cuenta:**
   - Usuario: elige uno (ej: `maksito-valhallamc`)
   - Email: tu email
   - Contraseña: una segura
   - Haz clic en "Create account"
4. **Verifica tu email** (revisa tu correo)
5. **¡Listo!** Ya tienes GitHub

---

## PASO 2: Subir tu código a GitHub

### Opción A: Desde el navegador (MÁS FÁCIL)

1. **Inicia sesión en GitHub**

2. **Crea un nuevo repositorio:**
   - Haz clic en el botón **"+"** (arriba derecha)
   - Selecciona **"New repository"**
   - **Repository name:** `valhallamc-website` (o el nombre que quieras)
   - **Description:** "Website para servidor ValhallaMC"
   - **Público o Privado:** Elige (público es gratis)
   - **NO marques** "Add a README file"
   - Haz clic en **"Create repository"**

3. **Sube tus archivos:**
   - GitHub te mostrará una página con instrucciones
   - Busca la sección **"uploading an existing file"**
   - Haz clic en **"uploading an existing file"**
   - **Arrastra y suelta** TODA la carpeta de tu proyecto
   - Espera a que suban todos los archivos
   - Abajo, en **"Commit changes"**, escribe: "Primera subida del proyecto"
   - Haz clic en **"Commit changes"**

4. **¡Listo!** Tu código ya está en GitHub

### Opción B: Usando GitHub Desktop (Alternativa)

Si prefieres una aplicación:

1. **Descarga GitHub Desktop:**
   - https://desktop.github.com
   - Instálalo

2. **Inicia sesión** con tu cuenta de GitHub

3. **Crea repositorio:**
   - File > New Repository
   - Name: `valhallamc-website`
   - Local Path: Selecciona tu carpeta del proyecto
   - Haz clic en "Create Repository"

4. **Sube el código:**
   - Verás todos tus archivos listados
   - Abajo, escribe: "Primera subida"
   - Haz clic en "Commit to main"
   - Luego haz clic en "Publish repository"

---

## PASO 3: Desplegar Frontend en Vercel

### ¿Qué es Vercel?
Es un servicio que convierte tu código en una página web funcionando.

### Pasos:

1. **Ve a:** https://vercel.com

2. **Inicia sesión:**
   - Haz clic en **"Sign Up"**
   - Selecciona **"Continue with GitHub"**
   - Autoriza a Vercel a acceder a tu GitHub

3. **Importa tu proyecto:**
   - Verás un botón **"Add New..."** > **"Project"**
   - O directamente verás tu repositorio listado
   - Haz clic en **"Import"** en tu repositorio `valhallamc-website`

4. **Configura el proyecto:**
   - **Framework Preset:** Debería decir "Next.js" (automático)
   - **Root Directory:** Haz clic en "Edit" y escribe: `client`
   - Esto le dice a Vercel que el frontend está en la carpeta `client`

5. **Variables de entorno:**
   - Haz clic en **"Environment Variables"**
   - Agrega estas dos variables (por ahora, las completaremos después):
     ```
     NEXT_PUBLIC_API_URL=https://tu-backend.railway.app/api
     NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_tu_clave_stripe
     ```
   - ⚠️ **NOTA:** Por ahora deja `tu-backend.railway.app` así, lo cambiaremos después

6. **Despliega:**
   - Haz clic en **"Deploy"**
   - Espera 2-3 minutos
   - ¡Listo! Verás una URL como: `valhallamc-website.vercel.app`

7. **Guarda esta URL:** La necesitarás después

---

## PASO 4: Crear cuenta en Railway

### ¿Qué es Railway?
Es donde correrá tu servidor backend (la parte que maneja pagos, usuarios, etc.)

### Pasos:

1. **Ve a:** https://railway.app

2. **Inicia sesión:**
   - Haz clic en **"Start a New Project"**
   - Selecciona **"Login with GitHub"**
   - Autoriza a Railway

3. **¡Listo!** Ya estás dentro de Railway

---

## PASO 5: Desplegar Backend en Railway

### Pasos:

1. **Crea nuevo proyecto:**
   - Haz clic en **"New Project"**
   - Selecciona **"Deploy from GitHub repo"**
   - Selecciona tu repositorio `valhallamc-website`
   - Railway empezará a detectar tu proyecto

2. **Configura el servicio:**
   - Railway detectará que hay código
   - Haz clic en el servicio que creó
   - Ve a la pestaña **"Settings"**
   - En **"Root Directory"**, escribe: `server`
   - Esto le dice a Railway que el backend está en la carpeta `server`

3. **Configura el comando de inicio:**
   - En **"Settings"** > **"Deploy"**
   - **Start Command:** `node index.js`
   - Guarda los cambios

4. **Crea la base de datos MySQL:**
   - En tu proyecto de Railway, haz clic en **"New"**
   - Selecciona **"Database"**
   - Selecciona **"MySQL"**
   - Railway creará automáticamente una base de datos MySQL
   - **Guarda las credenciales** que te muestra (las necesitarás)

5. **Variables de entorno:**
   - Ve a tu servicio backend (no la base de datos)
   - Pestaña **"Variables"**
   - Haz clic en **"New Variable"**
   - Agrega estas variables una por una:

   ```
   NODE_ENV=production
   PORT=5000
   ```

   Ahora agrega las de la base de datos (usa las credenciales que Railway te dio):
   ```
   DB_HOST=containers-us-west-XXX.railway.app
   DB_PORT=3306
   DB_NAME=railway
   DB_USER=root
   DB_PASSWORD=la_contraseña_que_te_dio_railway
   ```

   Continúa con las demás:
   ```
   JWT_SECRET=genera_un_secreto_largo_y_aleatorio_aqui_minimo_32_caracteres
   JWT_EXPIRE=7d
   CLIENT_URL=https://tu-frontend.vercel.app
   STRIPE_SECRET_KEY=sk_live_tu_clave_secreta_stripe
   STRIPE_PUBLISHABLE_KEY=pk_live_tu_clave_publica_stripe
   STRIPE_WEBHOOK_SECRET=whsec_tu_webhook_secret
   MC_SERVER_IP=valhallamc.lat
   MC_SERVER_PORT=25565
   ```

6. **Generar JWT_SECRET:**
   - Ve a: https://www.random.org/strings/
   - Genera una cadena de 64 caracteres
   - Cópiala y úsala como `JWT_SECRET`

7. **Despliega:**
   - Railway debería estar desplegando automáticamente
   - Ve a la pestaña **"Deployments"** para ver el progreso
   - Espera a que diga "Deploy Successful"
   - Haz clic en el servicio y verás una URL como: `tu-backend.up.railway.app`
   - **Guarda esta URL**

---

## PASO 6: Crear las tablas en MySQL

### Opción A: Desde Railway (Fácil)

1. **En Railway, haz clic en tu base de datos MySQL**
2. **Pestaña "Connect"**
3. **Copia el comando de conexión** que te muestra
4. **Abre una terminal local** (o usa Railway's terminal)
5. **Ejecuta el comando de conexión**
6. **Copia y pega el contenido de `database.sql`**
7. **Ejecuta** (Enter)

### Opción B: Desde phpMyAdmin (Si tienes acceso)

1. **Conecta a la base de datos** usando las credenciales de Railway
2. **Importa** el archivo `database.sql`

### Opción C: Dejar que Sequelize cree las tablas (Automático)

Si no puedes importar, el código creará las tablas automáticamente la primera vez que se ejecute.

---

## PASO 7: Actualizar URLs

### Actualizar Frontend (Vercel):

1. **Ve a Vercel** > Tu proyecto
2. **Settings** > **Environment Variables**
3. **Edita** `NEXT_PUBLIC_API_URL`:
   - Cambia `tu-backend.railway.app` por la URL real de Railway
   - Ejemplo: `https://tu-backend.up.railway.app/api`
4. **Redeploy:**
   - Ve a **"Deployments"**
   - Haz clic en los **3 puntos** del último deployment
   - **"Redeploy"**

### Actualizar Backend (Railway):

1. **Ve a Railway** > Tu servicio backend
2. **Variables**
3. **Edita** `CLIENT_URL`:
   - Cambia por la URL real de Vercel
   - Ejemplo: `https://valhallamc-website.vercel.app`
4. **Railway redeployará automáticamente**

---

## PASO 8: Configurar Stripe

### Obtener claves de Stripe:

1. **Ve a:** https://dashboard.stripe.com
2. **Inicia sesión** (o crea cuenta)
3. **Developers** > **API keys**
4. **Copia:**
   - **Publishable key** (pk_live_...)
   - **Secret key** (sk_live_...)

### Configurar Webhook:

1. **En Stripe:** Developers > Webhooks
2. **Add endpoint**
3. **URL:** `https://tu-backend.up.railway.app/api/payments/webhook`
4. **Events:** Selecciona:
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
5. **Add endpoint**
6. **Copia el "Signing secret"** (whsec_...)

### Agregar a Railway:

1. **Railway** > Tu servicio backend > **Variables**
2. **Actualiza:**
   - `STRIPE_SECRET_KEY` con tu sk_live_...
   - `STRIPE_PUBLISHABLE_KEY` con tu pk_live_...
   - `STRIPE_WEBHOOK_SECRET` con tu whsec_...

### Agregar a Vercel:

1. **Vercel** > Tu proyecto > **Environment Variables**
2. **Actualiza:**
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` con tu pk_live_...
3. **Redeploy**

---

## PASO 9: Crear Usuario Administrador

### Opción A: Desde Railway Terminal

1. **Railway** > Tu servicio backend
2. **Pestaña "Deployments"**
3. **Haz clic en el deployment activo**
4. **"View Logs"** o busca opción de terminal
5. **Ejecuta:**
   ```bash
   node scripts/create-admin.js admin@valhallamc.lat admin password123
   ```

### Opción B: Desde tu computadora

1. **Abre terminal** en tu computadora
2. **Navega a tu proyecto:**
   ```bash
   cd ruta/a/tu/proyecto
   ```
3. **Configura variables de entorno** (crea un archivo temporal `.env` en `server/`):
   ```
   DB_HOST=tu_host_de_railway
   DB_USER=root
   DB_PASSWORD=tu_password_de_railway
   DB_NAME=railway
   ```
4. **Ejecuta:**
   ```bash
   cd server
   node ../scripts/create-admin.js admin@valhallamc.lat admin password123
   ```

---

## PASO 10: Verificar que Todo Funciona

### Checklist:

1. **Frontend carga:**
   - Ve a tu URL de Vercel
   - Deberías ver la página de inicio

2. **Backend responde:**
   - Ve a: `https://tu-backend.up.railway.app/api/health`
   - Deberías ver: `{"status":"OK",...}`

3. **Registro funciona:**
   - En tu página, intenta registrarte
   - Debería funcionar

4. **Login funciona:**
   - Inicia sesión con el usuario que creaste

5. **Tienda muestra productos:**
   - Ve a la sección de tienda
   - Debería cargar (aunque esté vacía)

---

## 🎉 ¡Listo!

Tu página web está en línea y funcionando.

### URLs importantes:

- **Frontend:** `https://tu-proyecto.vercel.app`
- **Backend API:** `https://tu-backend.up.railway.app/api`
- **Health Check:** `https://tu-backend.up.railway.app/api/health`

---

## 🆘 Problemas Comunes

### "Error connecting to database"
- Verifica que las credenciales de MySQL en Railway sean correctas
- Verifica que la base de datos esté creada

### "Frontend no carga"
- Verifica que `NEXT_PUBLIC_API_URL` tenga la URL correcta de Railway
- Verifica que Railway esté desplegado correctamente

### "No puedo iniciar sesión"
- Verifica que el usuario admin esté creado
- Verifica los logs de Railway para ver errores

### "Stripe no funciona"
- Verifica que uses claves de PRODUCCIÓN (sk_live_, pk_live_)
- Verifica que el webhook esté configurado correctamente

---

## 📞 ¿Necesitas Ayuda?

Si te quedas atascado en algún paso:
1. Revisa los logs en Railway (pestaña "Deployments" > "View Logs")
2. Revisa los logs en Vercel (pestaña "Deployments" > haz clic en uno)
3. Verifica que todas las variables de entorno estén configuradas

---

## 🔄 Actualizar tu Código

Cada vez que hagas cambios:

1. **Sube los cambios a GitHub** (igual que al principio)
2. **Vercel y Railway se actualizarán automáticamente** en 2-3 minutos
3. **¡Listo!** No necesitas hacer nada más

---

**¡Éxito con tu proyecto! 🚀**

