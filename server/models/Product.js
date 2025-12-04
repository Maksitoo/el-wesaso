const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 0,
      notNull: true
    }
  },
  category: {
    type: DataTypes.ENUM('rank', 'item', 'package', 'coin', 'other'),
    allowNull: false,
    validate: {
      notNull: true
    }
  },
  image: {
    type: DataTypes.STRING(500),
    allowNull: true,
    defaultValue: ''
  },
  minecraftCommand: {
    type: DataTypes.STRING(500),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    allowNull: false
  },
  stock: {
    type: DataTypes.INTEGER,
    defaultValue: -1, // -1 significa ilimitado
    allowNull: false
  },
  salesCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false
  }
}, {
  tableName: 'products',
  timestamps: true
});

module.exports = Product;
