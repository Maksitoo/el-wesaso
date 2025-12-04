-- Script SQL para crear la base de datos y tablas
-- Ejecutar en MySQL antes de iniciar la aplicación

CREATE DATABASE IF NOT EXISTS minecraft_server CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE minecraft_server;

-- Tabla de usuarios
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(20) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  minecraftUsername VARCHAR(20),
  role ENUM('user', 'admin', 'moderator') DEFAULT 'user' NOT NULL,
  balance DECIMAL(10, 2) DEFAULT 0.00 NOT NULL,
  isActive BOOLEAN DEFAULT TRUE NOT NULL,
  lastLogin DATETIME,
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_username (username),
  INDEX idx_role (role)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla de productos
CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  category ENUM('rank', 'item', 'package', 'coin', 'other') NOT NULL,
  image VARCHAR(500) DEFAULT '',
  minecraftCommand VARCHAR(500) NOT NULL,
  isActive BOOLEAN DEFAULT TRUE NOT NULL,
  stock INT DEFAULT -1 NOT NULL,
  salesCount INT DEFAULT 0 NOT NULL,
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_category (category),
  INDEX idx_isActive (isActive)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla de compras
CREATE TABLE IF NOT EXISTS purchases (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userId INT NOT NULL,
  productId INT NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  paymentMethod ENUM('stripe', 'paypal', 'balance') NOT NULL,
  paymentIntentId VARCHAR(255) DEFAULT '',
  status ENUM('pending', 'completed', 'failed', 'refunded') DEFAULT 'pending' NOT NULL,
  minecraftCommand VARCHAR(500) NOT NULL,
  executed BOOLEAN DEFAULT FALSE NOT NULL,
  executedAt DATETIME,
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (productId) REFERENCES products(id) ON DELETE CASCADE,
  INDEX idx_userId (userId),
  INDEX idx_productId (productId),
  INDEX idx_status (status),
  INDEX idx_createdAt (createdAt)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

