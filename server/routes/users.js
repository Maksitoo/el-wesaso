const express = require('express');
const { User, Purchase } = require('../models');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/users/profile
// @desc    Obtener perfil del usuario
// @access  Private
router.get('/profile', protect, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      include: [{
        model: Purchase,
        as: 'purchases',
        include: [{
          model: require('../models').Product,
          as: 'product'
        }]
      }],
      attributes: { exclude: ['password'] }
    });
    
    res.json({
      success: true,
      user: {
        ...user.toJSON(),
        balance: parseFloat(user.balance),
        purchases: user.purchases || []
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error al obtener perfil', 
      error: error.message 
    });
  }
});

// @route   PUT /api/users/profile
// @desc    Actualizar perfil del usuario
// @access  Private
router.put('/profile', protect, async (req, res) => {
  try {
    const { minecraftUsername } = req.body;
    
    const user = await User.findByPk(req.user.id);
    if (minecraftUsername) {
      user.minecraftUsername = minecraftUsername;
      await user.save();
    }

    res.json({
      success: true,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        minecraftUsername: user.minecraftUsername,
        role: user.role,
        balance: parseFloat(user.balance)
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error al actualizar perfil', 
      error: error.message 
    });
  }
});

// @route   GET /api/users
// @desc    Obtener todos los usuarios (Admin)
// @access  Private/Admin
router.get('/', protect, authorize('admin'), async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] }
    });
    
    res.json({
      success: true,
      count: users.length,
      users: users.map(u => ({
        ...u.toJSON(),
        balance: parseFloat(u.balance)
      }))
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error al obtener usuarios', 
      error: error.message 
    });
  }
});

module.exports = router;
