const express = require('express');
const { protect, authorize } = require('../middleware/auth');
const { Product, User, Purchase } = require('../models');
const { body, validationResult } = require('express-validator');
const { Op } = require('sequelize');
const sequelize = require('../config/database');

const router = express.Router();

// All routes require admin role
router.use(protect);
router.use(authorize('admin'));

// @route   GET /api/admin/stats
// @desc    Obtener estadísticas del servidor
// @access  Private/Admin
router.get('/stats', async (req, res) => {
  try {
    const totalUsers = await User.count();
    const totalProducts = await Product.count();
    const totalPurchases = await Purchase.count();
    
    const revenueResult = await Purchase.sum('amount', {
      where: { status: 'completed' }
    });
    const totalRevenue = revenueResult || 0;

    res.json({
      success: true,
      stats: {
        totalUsers,
        totalProducts,
        totalPurchases,
        totalRevenue: parseFloat(totalRevenue)
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error al obtener estadísticas', 
      error: error.message 
    });
  }
});

// @route   POST /api/admin/products
// @desc    Crear nuevo producto
// @access  Private/Admin
router.post('/products', [
  body('name').notEmpty().withMessage('El nombre es requerido'),
  body('description').notEmpty().withMessage('La descripción es requerida'),
  body('price').isFloat({ min: 0 }).withMessage('El precio debe ser un número positivo'),
  body('category').isIn(['rank', 'item', 'package', 'coin', 'other']).withMessage('Categoría inválida'),
  body('minecraftCommand').notEmpty().withMessage('El comando de Minecraft es requerido')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const product = await Product.create(req.body);

    res.status(201).json({
      success: true,
      product: {
        ...product.toJSON(),
        price: parseFloat(product.price)
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error al crear producto', 
      error: error.message 
    });
  }
});

// @route   PUT /api/admin/products/:id
// @desc    Actualizar producto
// @access  Private/Admin
router.put('/products/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    
    if (!product) {
      return res.status(404).json({ 
        success: false, 
        message: 'Producto no encontrado' 
      });
    }

    await product.update(req.body);
    await product.reload();

    res.json({
      success: true,
      product: {
        ...product.toJSON(),
        price: parseFloat(product.price)
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error al actualizar producto', 
      error: error.message 
    });
  }
});

// @route   DELETE /api/admin/products/:id
// @desc    Eliminar producto
// @access  Private/Admin
router.delete('/products/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({ 
        success: false, 
        message: 'Producto no encontrado' 
      });
    }

    await product.destroy();

    res.json({
      success: true,
      message: 'Producto eliminado exitosamente'
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error al eliminar producto', 
      error: error.message 
    });
  }
});

module.exports = router;
