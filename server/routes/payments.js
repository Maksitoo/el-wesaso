const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { protect } = require('../middleware/auth');
const { Product, Purchase, User } = require('../models');
const { Op } = require('sequelize');

const router = express.Router();

// @route   POST /api/payments/create-intent
// @desc    Crear intent de pago con Stripe
// @access  Private
router.post('/create-intent', protect, async (req, res) => {
  try {
    const { productId } = req.body;

    const product = await Product.findByPk(productId);
    if (!product || !product.isActive) {
      return res.status(404).json({ 
        success: false, 
        message: 'Producto no encontrado' 
      });
    }

    // Check stock
    if (product.stock !== -1 && product.stock <= 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'Producto sin stock' 
      });
    }

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(parseFloat(product.price) * 100), // Convert to cents
      currency: 'usd',
      metadata: {
        userId: req.user.id.toString(),
        productId: productId.toString(),
        minecraftCommand: product.minecraftCommand
      }
    });

    res.json({
      success: true,
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error al crear intent de pago', 
      error: error.message 
    });
  }
});

// @route   POST /api/payments/webhook
// @desc    Webhook de Stripe para procesar pagos
// @access  Public (Stripe)
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object;
    
    try {
      const { userId, productId, minecraftCommand } = paymentIntent.metadata;
      
      // Get product to check stock
      const product = await Product.findByPk(productId);
      if (!product) {
        console.error('Producto no encontrado:', productId);
        return res.json({ received: true });
      }
      
      // Create purchase record
      const purchase = await Purchase.create({
        userId: parseInt(userId),
        productId: parseInt(productId),
        amount: paymentIntent.amount / 100,
        paymentMethod: 'stripe',
        paymentIntentId: paymentIntent.id,
        status: 'completed',
        minecraftCommand: minecraftCommand
      });

      // Update product sales
      await product.increment('salesCount');
      if (product.stock !== -1) {
        await product.decrement('stock');
      }
      await product.save();

      // TODO: Execute Minecraft command here
      // This would typically connect to your Minecraft server API
      console.log(`Comando a ejecutar: ${minecraftCommand} para usuario ${userId}`);

    } catch (error) {
      console.error('Error procesando pago:', error);
    }
  }

  res.json({ received: true });
});

// @route   GET /api/payments/purchases
// @desc    Obtener compras del usuario
// @access  Private
router.get('/purchases', protect, async (req, res) => {
  try {
    const purchases = await Purchase.findAll({
      where: { userId: req.user.id },
      include: [{
        model: Product,
        as: 'product'
      }],
      order: [['createdAt', 'DESC']]
    });

    res.json({
      success: true,
      count: purchases.length,
      purchases: purchases.map(p => ({
        ...p.toJSON(),
        amount: parseFloat(p.amount),
        product: p.product ? {
          ...p.product.toJSON(),
          price: parseFloat(p.product.price)
        } : null
      }))
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error al obtener compras', 
      error: error.message 
    });
  }
});

module.exports = router;
