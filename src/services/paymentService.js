// Stripe Payment Integration Service
// Initialize Stripe in your main.jsx: window.Stripe = Stripe('pk_test_...')

export const stripeConfig = {
  publicKey: import.meta.env.VITE_STRIPE_PUBLIC_KEY || 'pk_test_example',
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
};

// Create payment intent
export const createPaymentIntent = async (amount, categoryId, email) => {
  try {
    const response = await fetch(`${stripeConfig.apiUrl}/payment/create-intent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: Math.round(amount * 100), // Convert to cents
        categoryId,
        email,
      }),
    });

    if (!response.ok) throw new Error('Failed to create payment intent');
    return await response.json();
  } catch (error) {
    console.error('Error creating payment intent:', error);
    throw error;
  }
};

// Process card payment
export const processCardPayment = async (paymentIntentId, cardElement) => {
  try {
    const { error, paymentIntent } = await window.Stripe.confirmCardPayment(
      paymentIntentId,
      {
        payment_method: {
          card: cardElement,
        },
      }
    );

    if (error) {
      throw new Error(error.message);
    }

    return paymentIntent;
  } catch (error) {
    console.error('Error processing payment:', error);
    throw error;
  }
};

// Process PayPal payment
export const processPayPalPayment = async (amount, categoryId, email) => {
  try {
    const response = await fetch(`${stripeConfig.apiUrl}/payment/paypal/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount,
        categoryId,
        email,
        returnUrl: `${window.location.origin}/payment/success`,
        cancelUrl: `${window.location.origin}/payment/cancel`,
      }),
    });

    if (!response.ok) throw new Error('Failed to create PayPal payment');
    const data = await response.json();
    return data.approvalUrl; // Redirect user to this URL
  } catch (error) {
    console.error('Error processing PayPal payment:', error);
    throw error;
  }
};

// Process cryptocurrency payment
export const processCryptoPayment = async (amount, currency, categoryId, email) => {
  try {
    const response = await fetch(`${stripeConfig.apiUrl}/payment/crypto/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount,
        currency, // 'BTC', 'ETH', 'USDC', etc.
        categoryId,
        email,
      }),
    });

    if (!response.ok) throw new Error('Failed to create crypto payment');
    return await response.json();
  } catch (error) {
    console.error('Error processing crypto payment:', error);
    throw error;
  }
};

// Verify payment
export const verifyPayment = async (paymentId) => {
  try {
    const response = await fetch(`${stripeConfig.apiUrl}/payment/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ paymentId }),
    });

    if (!response.ok) throw new Error('Failed to verify payment');
    return await response.json();
  } catch (error) {
    console.error('Error verifying payment:', error);
    throw error;
  }
};

// Get user's purchase history
export const getPurchaseHistory = async (email) => {
  try {
    const response = await fetch(`${stripeConfig.apiUrl}/payment/history?email=${email}`);
    if (!response.ok) throw new Error('Failed to fetch purchase history');
    return await response.json();
  } catch (error) {
    console.error('Error fetching purchase history:', error);
    throw error;
  }
};

// Refund payment
export const refundPayment = async (paymentId, reason) => {
  try {
    const response = await fetch(`${stripeConfig.apiUrl}/payment/refund`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ paymentId, reason }),
    });

    if (!response.ok) throw new Error('Failed to process refund');
    return await response.json();
  } catch (error) {
    console.error('Error processing refund:', error);
    throw error;
  }
};