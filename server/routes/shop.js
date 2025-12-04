const express = require('express');
const { Product } = require('../models');
const { Op } = require('sequelize');

const router = express.Router();

// @route   GET /api/shop/products
// @desc    Obtener todos los productos activos
// @access  Public
router.get('/products', async (req, res) => {
  try {
    const { category } = req.query;
    const where = { isActive: true };
    
    if (category) {
      where.category = category;
    }

    const products = await Product.findAll({
      where,
      order: [['createdAt', 'DESC']]
    });
    
    res.json({
      success: true,
      count: products.length,
      products: products.map(p => ({
        ...p.toJSON(),
        price: parseFloat(p.price)
      }))
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error al obtener productos', 
      error: error.message 
    });
  }
});

// @route   GET /api/shop/products/:id
// @desc    Obtener un producto por ID
// @access  Public
router.get('/products/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    
    if (!product || !product.isActive) {
      return res.status(404).json({ 
        success: false, 
        message: 'Producto no encontrado' 
      });
    }

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
      message: 'Error al obtener producto', 
      error: error.message 
    });
  }
});

// @route   GET /api/shop/categories
// @desc    Obtener todas las categorías
// @access  Public
router.get('/categories', async (req, res) => {
  try {
    const products = await Product.findAll({
      where: { isActive: true },
      attributes: ['category'],
      group: ['category']
    });
    
    const categories = [...new Set(products.map(p => p.category))];
    
    res.json({
      success: true,
      categories
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error al obtener categorías', 
      error: error.message 
    });
  }
});

module.exports = router;
