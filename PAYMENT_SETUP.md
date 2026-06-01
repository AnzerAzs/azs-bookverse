# 💳 Payment Integration Setup Guide

## Overview

AZS BookVerse supports multiple payment methods:
- 💳 **Stripe** (Cards: Visa, Mastercard, Amex)
- 🅿️ **PayPal**
- ₿ **Cryptocurrency** (BTC, ETH, USDC)

---

## 1️⃣ Stripe Integration (Recommended)

### Setup Steps

1. **Create Stripe Account**
   - Go to [stripe.com](https://stripe.com)
   - Sign up and verify email
   - Get your API keys from Dashboard → API Keys

2. **Add to Environment Variables**
   ```env
   VITE_STRIPE_PUBLIC_KEY=pk_test_xxxxxxxxx
   VITE_STRIPE_SECRET_KEY=sk_test_xxxxxxxxx
   ```

3. **Install Stripe JS**
   ```bash
   npm install @stripe/react-stripe-js @stripe/js
   ```

4. **Add Stripe Script to index.html**
   ```html
   <script src="https://js.stripe.com/v3/"></script>
   ```

5. **Initialize in main.jsx**
   ```javascript
   import { loadStripe } from '@stripe/js';
   
   const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
   window.Stripe = stripe;
   ```

### Backend Setup

1. **Install dependencies**
   ```bash
   cd backend
   npm install stripe express dotenv cors
   ```

2. **Start server**
   ```bash
   node server.js
   ```

---

## 2️⃣ PayPal Integration

### Setup Steps

1. **Create PayPal Business Account**
   - Go to [paypal.com](https://paypal.com)
   - Sign up for Business account
   - Get Client ID from Developer Dashboard

2. **Install PayPal SDK**
   ```bash
   npm install @paypal/checkout-server-sdk
   ```

3. **Add to Environment Variables**
   ```env
   VITE_PAYPAL_CLIENT_ID=your_client_id
   PAYPAL_CLIENT_SECRET=your_client_secret
   ```

4. **Add PayPal Script to index.html**
   ```html
   <script src="https://www.paypal.com/sdk/js?client-id=YOUR_CLIENT_ID"></script>
   ```

---

## 3️⃣ Cryptocurrency Integration

### Supported Currencies
- Bitcoin (BTC)
- Ethereum (ETH)
- USDC (Stablecoin)

### Setup Steps

1. **Choose Crypto Provider**
   - **Coinbase Commerce** (Recommended)
   - BitPay
   - Cryptomus

2. **For Coinbase Commerce**
   ```bash
   npm install coinbase-commerce
   ```

3. **Get API Key**
   - Sign up at [commerce.coinbase.com](https://commerce.coinbase.com)
   - Get your API key
   - Add to .env: `CRYPTO_API_KEY=your_key`

---

## 📝 Implementation Steps

### 1. Update App.jsx

```javascript
import PaymentModal from './components/PaymentModal';
import PricingPlans from './components/PricingPlans';

export default function App() {
  const [showPayment, setShowPayment] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
    setShowPayment(true);
  };

  return (
    <div>
      {/* Your existing code */}
      
      <PricingPlans 
        isDarkMode={isDarkMode} 
        onSelectPlan={handleSelectCategory}
      />
      
      <PaymentModal
        isOpen={showPayment}
        onClose={() => setShowPayment(false)}
        category={selectedCategory}
        isDarkMode={isDarkMode}
      />
    </div>
  );
}
```

### 2. Update CategoryGrid.jsx

Add "Upgrade to Premium" button:

```javascript
<button
  onClick={() => onUpgrade(category)}
  className="block w-full btn-secondary text-center mb-2"
>
  ⭐ Upgrade to Premium
</button>
```

---

## 🔐 Security Best Practices

✅ **DO:**
- Store API keys only in environment variables
- Use HTTPS in production
- Validate payments on backend
- Store transaction records
- Implement webhook handlers

❌ **DON'T:**
- Expose secret keys in code
- Trust client-side validation alone
- Store credit card details
- Skip SSL/TLS encryption

---

## 🧪 Testing

### Stripe Test Cards

```
Success: 4242 4242 4242 4242
Decline: 4000 0000 0000 0002
Fraud Warning: 4000 0025 0000 3155
Expiry: Any future date
CVC: Any 3 digits
```

### PayPal Sandbox

- Buyer: sb-xxxxx@personal.example.com
- Seller: sb-xxxxx@business.example.com
- Password: (use sandbox password)

---

## 💰 Pricing Strategy

**Free Plan**
- Browse categories
- Limited previews

**Premium Plan ($9.99/month)**
- Full access to all categories
- Download offline
- Ad-free

**Enterprise Plan**
- Custom pricing
- API access
- Dedicated support

---

## 📊 Payment Monitoring

### Monitor Transactions

```javascript
// Check payment status
const checkPayment = async (paymentId) => {
  const payment = await stripe.paymentIntents.retrieve(paymentId);
  console.log('Status:', payment.status);
  console.log('Amount:', payment.amount / 100);
};
```

### Webhook Events to Handle

```javascript
// Successful payment
case 'payment_intent.succeeded':
  // Unlock premium content
  break;

// Payment failed
case 'payment_intent.payment_failed':
  // Notify user
  break;

// Dispute created
case 'charge.dispute.created':
  // Handle dispute
  break;
```

---

## 🚀 Deployment Checklist

- [ ] All API keys added to production .env
- [ ] HTTPS enabled
- [ ] Webhook URLs configured
- [ ] Error handling implemented
- [ ] Payment receipts working
- [ ] Refund process tested
- [ ] Database backups configured
- [ ] Payment logs enabled
- [ ] SSL certificates installed
- [ ] Rate limiting enabled

---

## 📞 Support

- **Stripe Support**: https://support.stripe.com
- **PayPal Developer**: https://developer.paypal.com
- **Coinbase Commerce**: https://commerce.coinbase.com

---

**Made with ❤️ by AZS Dev Team**
