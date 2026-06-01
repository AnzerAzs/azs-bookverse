// Backend Server - Node.js + Express
// Install: npm install express stripe dotenv cors axios

const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

// ==================== STRIPE PAYMENTS ====================

// Create payment intent
app.post('/api/payment/create-intent', async (req, res) => {
  try {
    const { amount, categoryId, email } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Amount in cents
      currency: 'usd',
      metadata: {
        categoryId,
        email,
      },
    });

    res.json({
      success: true,
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (error) {
    console.error('Payment intent error:', error);
    res.status(400).json({ error: error.message });
  }
});

// Verify payment
app.post('/api/payment/verify', async (req, res) => {
  try {
    const { paymentId } = req.body;

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentId);

    if (paymentIntent.status === 'succeeded') {
      // Save payment to database
      // await savePaymentToDatabase(paymentIntent);

      res.json({
        success: true,
        status: 'completed',
        amount: paymentIntent.amount / 100,
      });
    } else {
      res.json({
        success: false,
        status: paymentIntent.status,
      });
    }
  } catch (error) {
    console.error('Verify payment error:', error);
    res.status(400).json({ error: error.message });
  }
});

// Refund payment
app.post('/api/payment/refund', async (req, res) => {
  try {
    const { paymentId, reason } = req.body;

    const refund = await stripe.refunds.create({
      payment_intent: paymentId,
      reason,
    });

    res.json({
      success: true,
      refundId: refund.id,
      amount: refund.amount / 100,
    });
  } catch (error) {
    console.error('Refund error:', error);
    res.status(400).json({ error: error.message });
  }
});

// ==================== PAYPAL PAYMENTS ====================

// Create PayPal order
app.post('/api/payment/paypal/create', async (req, res) => {
  try {
    const { amount, categoryId, email } = req.body;

    // You would use PayPal SDK here
    // This is a placeholder
    const paypalOrder = {
      id: `PAY-${Date.now()}`,
      amount,
      categoryId,
      email,
      status: 'created',
      approvalUrl: `https://sandbox.paypal.com/checkoutnow?token=${Date.now()}`,
    };

    res.json({
      success: true,
      ...paypalOrder,
    });
  } catch (error) {
    console.error('PayPal error:', error);
    res.status(400).json({ error: error.message });
  }
});

// ==================== CRYPTO PAYMENTS ====================

// Create crypto payment
app.post('/api/payment/crypto/create', async (req, res) => {
  try {
    const { amount, currency, categoryId, email } = req.body;

    // Integrate with crypto payment provider (Coinbase, BitPay, etc.)
    const cryptoPayment = {
      id: `CRYPTO-${Date.now()}`,
      amount,
      currency,
      categoryId,
      email,
      walletAddress: '1A1z7agoat2GPFH3tCmmk2Zst6dt7yaiR', // Example BTC address
      status: 'pending',
      expiresAt: new Date(Date.now() + 30 * 60 * 1000), // 30 minutes
    };

    res.json({
      success: true,
      ...cryptoPayment,
    });
  } catch (error) {
    console.error('Crypto payment error:', error);
    res.status(400).json({ error: error.message });
  }
});

// ==================== PAYMENT HISTORY ====================

// Get purchase history
app.get('/api/payment/history', async (req, res) => {
  try {
    const { email } = req.query;

    // Query database for user's purchases
    // const purchases = await database.query({ email });

    const mockPurchases = [
      {
        id: 'PAY-001',
        categoryId: 1,
        categoryName: 'Science',
        amount: 9.99,
        date: '2026-06-01',
        status: 'completed',
      },
    ];

    res.json({
      success: true,
      email,
      purchases: mockPurchases,
    });
  } catch (error) {
    console.error('History error:', error);
    res.status(400).json({ error: error.message });
  }
});

// ==================== WEBHOOK ====================

// Stripe webhook
app.post('/webhook/stripe', express.raw({ type: 'application/json' }), (req, res) => {
  const sig = req.headers['stripe-signature'];

  try {
    const event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    switch (event.type) {
      case 'payment_intent.succeeded':
        console.log('Payment succeeded:', event.data.object);
        // Handle successful payment
        break;
      case 'payment_intent.payment_failed':
        console.log('Payment failed:', event.data.object);
        // Handle failed payment
        break;
    }

    res.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(400).json({ error: error.message });
  }
});

// ==================== SERVER START ====================

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`🐶 Payment endpoints ready for integration`);
});

module.exports = app;
