#!/bin/sh

# Iniciar backend
cd /app/server
node index.js &

# Iniciar frontend
cd /app/client
npm start &

# Mantener contenedor corriendo
wait

