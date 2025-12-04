#!/usr/bin/env node

/**
 * Script para crear un usuario administrador
 * Uso: node scripts/create-admin.js <email> <username> <password>
 */

require('dotenv').config({ path: './server/.env' });
const sequelize = require('../server/config/database');
const { User } = require('../server/models');

const [,, email, username, password] = process.argv;

if (!email || !username || !password) {
  console.error('❌ Uso: node scripts/create-admin.js <email> <username> <password>');
  process.exit(1);
}

async function createAdmin() {
  try {
    // Conectar a la base de datos
    await sequelize.authenticate();
    console.log('✅ Conectado a MySQL');

    // Verificar si el usuario ya existe
    const { Op } = require('sequelize');
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ email }, { username }]
      }
    });

    if (existingUser) {
      // Actualizar a admin
      existingUser.role = 'admin';
      await existingUser.save();
      console.log(`✅ Usuario ${existingUser.email} actualizado a administrador`);
    } else {
      // Crear nuevo usuario admin
      const admin = await User.create({
        email,
        username,
        password,
        role: 'admin'
      });
      console.log(`✅ Usuario administrador creado: ${admin.email}`);
    }

    await sequelize.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

createAdmin();
