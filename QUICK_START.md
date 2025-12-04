# 🚀 Inicio Rápido - Producción

## Pasos Rápidos para Desplegar

### 1. Preparar Servidor
```bash
# Instalar Node.js y PM2
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo npm install -g pm2
```

### 2. Clonar y Configurar
```bash
git clone <repo> /var/www/valhallamc
cd /var/www/valhallamc
npm run install:all
cd client && npm run build && cd ..
```

### 3. Configurar Variables de Entorno

**Backend:**
```bash
cp server/env.production.example server/.env
nano server/.env  # Editar con tus valores
```

**Frontend:**
```bash
cp client/env.production.example client/.env.local
nano client/.env.local  # Editar con tus valores
```

### 4. Generar Secretos
```bash
npm run generate:secret  # Copiar a JWT_SECRET en server/.env
```

### 5. Configurar Nginx
```bash
sudo cp nginx.conf.example /etc/nginx/sites-available/valhallamc
sudo ln -s /etc/nginx/sites-available/valhallamc /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### 6. Configurar SSL
```bash
sudo certbot --nginx -d valhallamc.lat -d www.valhallamc.lat
```

### 7. Iniciar Aplicación
```bash
mkdir -p logs
npm run pm2:start
pm2 save
pm2 startup  # Seguir instrucciones
```

### 8. Crear Admin
```bash
npm run create:admin admin@valhallamc.lat admin password123
```

### 9. Verificar
- ✅ https://valhallamc.lat
- ✅ https://valhallamc.lat/api/health
- ✅ Probar registro/login
- ✅ Configurar webhook de Stripe

## Comandos Útiles

```bash
# Ver logs
pm2 logs

# Reiniciar
npm run pm2:restart

# Estado
pm2 status

# Actualizar código
git pull
cd client && npm run build && cd ..
npm run pm2:restart
```

## ⚠️ Importante

1. **Stripe**: Usa claves de PRODUCCIÓN (sk_live_ y pk_live_)
2. **MongoDB**: Usa MongoDB Atlas para producción
3. **SSL**: Siempre usa HTTPS en producción
4. **Backups**: Configura backups automáticos
5. **Monitoreo**: Revisa logs regularmente

## 📚 Documentación Completa

- [Guía de Despliegue Completa](DEPLOY.md)
- [Checklist de Producción](PRODUCTION_CHECKLIST.md)
- [README Principal](README.md)

