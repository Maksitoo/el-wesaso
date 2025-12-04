#!/usr/bin/env node

/**
 * Script para generar un secreto JWT seguro
 * Uso: node scripts/generate-secret.js
 */

const crypto = require('crypto');

const secret = crypto.randomBytes(64).toString('base64');

console.log('\n✅ Secreto JWT generado:\n');
console.log(secret);
console.log('\n📝 Copia este valor a tu archivo .env como JWT_SECRET\n');
console.log('⚠️  IMPORTANTE: Guarda este secreto de forma segura y nunca lo compartas\n');

