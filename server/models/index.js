const sequelize = require('../config/database');
const User = require('./User');
const Product = require('./Product');
const Purchase = require('./Purchase');

// Definir relaciones
User.hasMany(Purchase, { foreignKey: 'userId', as: 'purchases' });
Purchase.belongsTo(User, { foreignKey: 'userId', as: 'user' });

Product.hasMany(Purchase, { foreignKey: 'productId', as: 'purchases' });
Purchase.belongsTo(Product, { foreignKey: 'productId', as: 'product' });

module.exports = {
  sequelize,
  User,
  Product,
  Purchase
};

