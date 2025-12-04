const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Purchase = sequelize.define('Purchase', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'products',
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 0,
      notNull: true
    }
  },
  paymentMethod: {
    type: DataTypes.ENUM('stripe', 'paypal', 'balance'),
    allowNull: false,
    validate: {
      notNull: true
    }
  },
  paymentIntentId: {
    type: DataTypes.STRING(255),
    allowNull: true,
    defaultValue: ''
  },
  status: {
    type: DataTypes.ENUM('pending', 'completed', 'failed', 'refunded'),
    defaultValue: 'pending',
    allowNull: false
  },
  minecraftCommand: {
    type: DataTypes.STRING(500),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  executed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false
  },
  executedAt: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'purchases',
  timestamps: true
});

module.exports = Purchase;
