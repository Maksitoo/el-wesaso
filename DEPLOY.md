# Guía de Despliegue a Producción

## Requisitos Previos

- Servidor con Node.js 18+ instalado
- MongoDB (local o Atlas)
- Cuenta de Stripe con claves de producción
- Dominio configurado: `valhallamc.lat`
- Certificado SSL (Let's Encrypt recomendado)
- PM2 instalado globalmente: `npm install -g pm2`

## Pasos de Despliegue

### 1. Preparar el Servidor

```bash
# Actualizar sistema
sudo apt update && sudo apt upgrade -y

# Instalar Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Instalar PM2 globalmente
sudo npm install -g pm2

# Instalar Nginx (opcional, para reverse proxy)
sudo apt install nginx -y
```

### 2. Clonar y Configurar el Proyecto

```bash
# Clonar repositorio
git clone <tu-repositorio> /var/www/valhallamc
cd /var/www/valhallamc

# Instalar dependencias
npm run install:all

# Construir frontend
cd client
npm run build
cd ..
```

### 3. Configurar Variables de Entorno

**Backend (`server/.env`):**
```env
NODE_ENV=production
PORT=5000

# MongoDB (usar Atlas para producción)
MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/valhallamc?retryWrites=true&w=majority

# JWT
JWT_SECRET=genera_un_secreto_super_seguro_y_largo_aqui_minimo_32_caracteres
JWT_EXPIRE=7d

# Cliente
CLIENT_URL=https://valhallamc.lat

# Stripe (claves de PRODUCCIÓN)
STRIPE_SECRET_KEY=sk_live_tu_clave_secreta_real
STRIPE_PUBLISHABLE_KEY=pk_live_tu_clave_publica_real
STRIPE_WEBHOOK_SECRET=whsec_tu_webhook_secret_real

# Minecraft Server
MC_SERVER_IP=valhallamc.lat
MC_SERVER_PORT=25565
```

**Frontend (`client/.env.local`):**
```env
NEXT_PUBLIC_API_URL=https://valhallamc.lat/api
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_tu_clave_publica_real
```

### 4. Configurar Nginx (Reverse Proxy)

Crear archivo `/etc/nginx/sites-available/valhallamc`:

```nginx
server {
    listen 80;
    server_name valhallamc.lat www.valhallamc.lat;

    # Redirigir HTTP a HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name valhallamc.lat www.valhallamc.lat;

    # Certificados SSL (Let's Encrypt)
    ssl_certificate /etc/letsencrypt/live/valhallamc.lat/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/valhallamc.lat/privkey.pem;
    
    # Configuración SSL
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    # Tamaño máximo de archivo
    client_max_body_size 10M;

    # Frontend (Next.js)
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # Webhook de Stripe (sin rate limiting)
    location /api/payments/webhook {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Content-Length "";
    }
}
```

Activar configuración:
```bash
sudo ln -s /etc/nginx/sites-available/valhallamc /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### 5. Configurar SSL con Let's Encrypt

```bash
# Instalar Certbot
sudo apt install certbot python3-certbot-nginx -y

# Obtener certificado
sudo certbot --nginx -d valhallamc.lat -d www.valhallamc.lat

# Renovación automática (ya está configurado)
sudo certbot renew --dry-run
```

### 6. Iniciar con PM2

```bash
# Crear directorio de logs
mkdir -p logs

# Iniciar aplicaciones
npm run pm2:start

# Guardar configuración de PM2
pm2 save

# Configurar PM2 para iniciar al arrancar el servidor
pm2 startup
# Ejecutar el comando que te muestre
```

### 7. Configurar Stripe Webhook

1. Ir a https://dashboard.stripe.com/webhooks
2. Agregar endpoint:
   - URL: `https://valhallamc.lat/api/payments/webhook`
   - Eventos: `payment_intent.succeeded`, `payment_intent.payment_failed`
3. Copiar el webhook secret a `server/.env`

### 8. Monitoreo

```bash
# Ver logs
pm2 logs

# Ver estado
pm2 status

# Monitoreo en tiempo real
pm2 monit

# Reiniciar
npm run pm2:restart
```

## Comandos Útiles

```bash
# Ver logs del backend
pm2 logs valhallamc-backend

# Ver logs del frontend
pm2 logs valhallamc-frontend

# Reiniciar todo
npm run pm2:restart

# Detener todo
npm run pm2:stop

# Actualizar código
git pull
cd client && npm run build && cd ..
npm run pm2:restart
```

## Seguridad Adicional

1. **Firewall:**
```bash
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

2. **Actualizar MongoDB:**
   - Usar MongoDB Atlas (recomendado)
   - Configurar IP whitelist
   - Usar autenticación fuerte

3. **Backups:**
   - Configurar backups automáticos de MongoDB
   - Backup de archivos .env

## Verificación

1. Verificar que el sitio carga: https://valhallamc.lat
2. Verificar API: https://valhallamc.lat/api/health
3. Probar registro de usuario
4. Probar pago de prueba con Stripe

## Troubleshooting

### Error 502 Bad Gateway
- Verificar que PM2 esté corriendo: `pm2 status`
- Verificar logs: `pm2 logs`
- Verificar que los puertos 3000 y 5000 estén abiertos

### Error de conexión a MongoDB
- Verificar URI en `.env`
- Verificar IP whitelist en Atlas
- Verificar credenciales

### Error de Stripe
- Verificar claves de producción
- Verificar webhook configurado
- Verificar webhook secret

