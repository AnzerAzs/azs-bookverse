import { Check, Zap } from 'lucide-react';

export default function PricingPlans({ isDarkMode, onSelectPlan }) {
  const plans = [
    {
      name: 'Free',
      price: 0,
      icon: '📚',
      description: 'Browse all categories',
      features: [
        'Access to public categories',
        'Search functionality',
        'Category previews',
        'Basic support',
      ],
      popular: false,
      cta: 'Get Started',
      ctaAction: () => onSelectPlan('free'),
    },
    {
      name: 'Premium',
      price: 9.99,
      icon: '⭐',
      description: 'Unlimited access to all categories',
      features: [
        'All Free features',
        '✨ Unlimited category access',
        'Priority support',
        'Ad-free experience',
        'Download books offline',
        'Monthly updates',
      ],
      popular: true,
      cta: 'Start Free Trial',
      ctaAction: () => onSelectPlan('premium'),
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      icon: '🚀',
      description: 'Custom solutions for organizations',
      features: [
        'All Premium features',
        'Custom categories',
        'Team management',
        'API access',
        'Dedicated support',
        'SLA guarantee',
      ],
      popular: false,
      cta: 'Contact Sales',
      ctaAction: () => onSelectPlan('enterprise'),
    },
  ];

  return (
    <section className={`py-16 px-4 ${
      isDarkMode ? 'bg-dark-bg' : 'bg-white'
    }`}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className={`text-4xl font-bold mb-4 ${
            isDarkMode ? 'text-neon-green' : 'text-dark-bg'
          }`}>
            💰 Simple, Transparent Pricing
          </h2>
          <p className={`text-lg ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Choose the perfect plan for your knowledge journey
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl transition-smooth overflow-hidden ${
                plan.popular
                  ? isDarkMode
                    ? 'glass-effect border-2 border-neon-green scale-105 shadow-glow-lg'
                    : 'bg-white border-2 border-neon-dark shadow-lg scale-105'
                  : isDarkMode
                    ? 'glass-effect border-2 border-gray-700 hover:border-neon-green/50'
                    : 'bg-gray-50 border-2 border-gray-200 hover:border-neon-dark'
              }}`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-gradient-to-r from-neon-green to-neon-dark px-4 py-1 rounded-bl-lg flex items-center gap-1">
                  <Zap size={14} className="text-dark-bg" />
                  <span className="text-xs font-bold text-dark-bg">POPULAR</span>
                </div>
              )}

              <div className={`p-8 ${
                plan.popular && isDarkMode ? 'border-b border-neon-green/30' : ''
              }`}>
                {/* Header */}
                <div className="text-center mb-6">
                  <div className="text-5xl mb-3">{plan.icon}</div>
                  <h3 className={`text-2xl font-bold mb-2 ${
                    isDarkMode ? 'text-neon-green' : 'text-dark-bg'
                  }`}>
                    {plan.name}
                  </h3>
                  <p className={`text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {plan.description}
                  </p>
                </div>

                {/* Price */}
                <div className="text-center mb-6">
                  <div className={`text-4xl font-bold ${
                    isDarkMode ? 'text-neon-green' : 'text-neon-dark'
                  }`}>
                    {typeof plan.price === 'number' ? `$${plan.price}` : plan.price}
                  </div>
                  {typeof plan.price === 'number' && plan.price > 0 && (
                    <p className={`text-sm ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      per month
                    </p>
                  )}
                </div>

                {/* CTA Button */}
                <button
                  onClick={plan.ctaAction}
                  className={`w-full py-3 rounded-lg font-bold transition-smooth mb-6 ${
                    plan.popular
                      ? 'btn-primary hover:shadow-glow-lg'
                      : 'btn-secondary'
                  }`}
                >
                  {plan.cta}
                </button>

                {/* Features */}
                <div className="space-y-3">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3">
                      <Check size={18} className="text-neon-green flex-shrink-0 mt-0.5" />
                      <span className={`text-sm ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-16 max-w-2xl mx-auto">
          <h3 className={`text-2xl font-bold text-center mb-8 ${
            isDarkMode ? 'text-neon-green' : 'text-dark-bg'
          }`}>
            ❓ Frequently Asked Questions
          </h3>
          <div className="space-y-4">
            {[
              { q: 'Can I cancel anytime?', a: 'Yes! No lock-in contracts. Cancel anytime from your account settings.' },
              { q: 'Is there a free trial?', a: 'Yes! Premium plan comes with a 7-day free trial, no credit card required.' },
              { q: 'What payment methods do you accept?', a: 'We accept Visa, Mastercard, PayPal, and cryptocurrencies (BTC, ETH, USDC).' },
              { q: 'Do you offer refunds?', a: 'Yes! 30-day money-back guarantee if you\'re not satisfied.' },
            ].map((faq, idx) => (
              <details key={idx} className={`group rounded-lg border-2 ${
                isDarkMode
                  ? 'border-gray-700 hover:border-neon-green/30'
                  : 'border-gray-300 hover:border-gray-400'
              }`}>
                <summary className={`p-4 font-semibold cursor-pointer select-none ${
                  isDarkMode ? 'hover:bg-white/5' : 'hover:bg-gray-50'
                }`}>
                  {faq.q}
                </summary>
                <p className={`px-4 pb-4 pt-0 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
