# ✅ Checklist de Producción

## Antes de Desplegar

### Seguridad
- [ ] Cambiar todas las contraseñas por defecto
- [ ] Generar JWT_SECRET seguro (mínimo 32 caracteres)
- [ ] Usar claves de Stripe de PRODUCCIÓN (sk_live_ y pk_live_)
- [ ] Configurar MongoDB con autenticación
- [ ] Habilitar firewall en el servidor
- [ ] Configurar SSL/HTTPS (Let's Encrypt)
- [ ] Verificar que .env no esté en el repositorio
- [ ] Configurar CORS correctamente
- [ ] Habilitar rate limiting

### Base de Datos
- [ ] Configurar MongoDB Atlas (recomendado)
- [ ] Configurar backups automáticos
- [ ] Configurar IP whitelist
- [ ] Probar conexión desde el servidor

### Stripe
- [ ] Cambiar a modo producción en Stripe
- [ ] Obtener claves de producción
- [ ] Configurar webhook: `https://valhallamc.lat/api/payments/webhook`
- [ ] Probar webhook con Stripe CLI
- [ ] Verificar eventos: `payment_intent.succeeded`, `payment_intent.payment_failed`

### Variables de Entorno
- [ ] Backend: `server/.env` configurado
- [ ] Frontend: `client/.env.local` configurado
- [ ] Todas las URLs usan HTTPS
- [ ] NODE_ENV=production

### Código
- [ ] Build del frontend exitoso: `npm run build`
- [ ] Sin errores de linting
- [ ] Probar registro de usuario
- [ ] Probar login
- [ ] Probar compra de prueba
- [ ] Verificar que los comandos de Minecraft funcionen

### Servidor
- [ ] Node.js 18+ instalado
- [ ] PM2 instalado y configurado
- [ ] Nginx configurado como reverse proxy
- [ ] SSL/HTTPS funcionando
- [ ] Firewall configurado
- [ ] Logs configurados

### Monitoreo
- [ ] PM2 monit configurado
- [ ] Logs accesibles
- [ ] Health check funcionando: `/api/health`
- [ ] Alertas configuradas (opcional)

## Después de Desplegar

### Verificación
- [ ] Sitio carga: https://valhallamc.lat
- [ ] API responde: https://valhallamc.lat/api/health
- [ ] Registro de usuario funciona
- [ ] Login funciona
- [ ] Tienda muestra productos
- [ ] Checkout de Stripe funciona
- [ ] Webhook de Stripe recibe eventos
- [ ] Comandos de Minecraft se ejecutan

### Optimización
- [ ] Comprimir imágenes
- [ ] Habilitar caché de Nginx
- [ ] Configurar CDN (opcional)
- [ ] Optimizar base de datos (índices)

### Documentación
- [ ] Documentar proceso de despliegue
- [ ] Documentar comandos útiles
- [ ] Crear usuario administrador
- [ ] Documentar credenciales (en lugar seguro)

## Comandos Post-Despliegue

```bash
# Verificar estado
pm2 status
pm2 logs

# Verificar salud del servidor
curl https://valhallamc.lat/api/health

# Crear usuario admin
# En MongoDB o desde la consola del servidor
```

## Contactos de Emergencia

- Hosting: _______________
- Stripe Support: https://support.stripe.com
- MongoDB Support: https://support.mongodb.com

