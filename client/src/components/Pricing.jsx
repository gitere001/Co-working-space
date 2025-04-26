import React, { useState } from 'react';
import { Check } from 'lucide-react';

const Pricing = ({pricingRef}) => {
  const [billingPeriod, setBillingPeriod] = useState('monthly');

  const pricingPlans = {
    monthly: [
      {
        id: 'hot-desk',
        name: 'Hot Desk',
        price: 'Kes 3000',
        description: 'Perfect for occasional use and flexibility.',
        features: [
          'Access during business hours',
          'Shared workspace',
          'High-speed WiFi',
          'Coffee & tea included',
          '2 hours of meeting room credits',
        ],
        popular: false,
        billingPeriod: 'monthly'
      },
      {
        id: 'dedicated-desk',
        name: 'Dedicated Desk',
        price: 'Kes 20000',
        description: 'Ideal for regular use with your own permanent desk.',
        features: [
          '24/7 access',
          'Personal desk & chair',
          'Storage locker',
          'All amenities included',
          '10 hours of meeting room credits',
          'Business address service',
        ],
        popular: true,
        billingPeriod: 'monthly'
      },
      {
        id: 'private-office',
        name: 'Private Office',
        price: 'Kes 50000',
        description: 'Best for teams needing privacy and collaboration space.',
        features: [
          '24/7 access',
          'Private, lockable office',
          'All amenities included',
          'Unlimited meeting room access',
          'Business address & mail handling',
          'Dedicated phone line',
          'Customizable space options',
        ],
        popular: false,
        billingPeriod: 'monthly'
      }
    ],
    yearly: [
      {
        id: 'hot-desk',
        name: 'Hot Desk',
        price: 'Kes 3000',
        description: 'Perfect for occasional use and flexibility.',
        features: [
          'Access during business hours',
          'Shared workspace',
          'High-speed WiFi',
          'Coffee & tea included',
          '2 hours of meeting room credits',
        ],
        popular: false,
        billingPeriod: 'monthly'
      },
      {
        id: 'dedicated-desk',
        name: 'Dedicated Desk',
        price: 'Kes 15000',
        description: 'Ideal for regular use with your own permanent desk.',
        features: [
          '24/7 access',
          'Personal desk & chair',
          'Storage locker',
          'All amenities included',
          '10 hours of meeting room credits',
          'Business address service',
        ],
        popular: true,
        billingPeriod: 'monthly'
      },
      {
        id: 'private-office',
        name: 'Private Office',
        price: 'Kes 40000',
        description: 'Best for teams needing privacy and collaboration space.',
        features: [
          '24/7 access',
          'Private, lockable office',
          'All amenities included',
          'Unlimited meeting room access',
          'Business address & mail handling',
          'Dedicated phone line',
          'Customizable space options',
        ],
        popular: false,
        billingPeriod: 'monthly'
      }
    ]
  };

  const plans = pricingPlans[billingPeriod];

  return (
    <section ref={pricingRef} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the plan that works best for your needs and budget.
          </p>

          {/* Billing toggle */}
          <div className="flex justify-center items-center mt-8">
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={`px-4 py-2 rounded-l-lg ${
                billingPeriod === 'monthly'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingPeriod('yearly')}
              className={`px-4 py-2 rounded-r-lg ${
                billingPeriod === 'yearly'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              Yearly <span className="text-xs font-medium">(Save 20%)</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-xl shadow-lg overflow-hidden transition-transform hover:-translate-y-1 ${
                plan.popular ? 'border-2 border-blue-600 transform scale-105 md:scale-110 z-10' : ''
              }`}
            >
              {plan.popular && (
                <div className="bg-blue-600 py-1 text-center text-white text-sm font-medium">
                  Most Popular
                </div>
              )}

              <div className="p-8 bg-white">
                <h3 className="text-xl font-bold text-gray-900 mb-4">{plan.name}</h3>
                <div className="flex items-baseline mb-4">
                  <span className="text-4xl font-extrabold text-gray-900">{plan.price}</span>
                  <span className="text-gray-600 ml-1">/{billingPeriod === 'monthly' ? 'mo' : 'mo (billed yearly)'}</span>
                </div>
                <p className="text-gray-600 mb-6">{plan.description}</p>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                  plan.popular
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                }`}>
                  Choose {plan.name}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600">
            Need a custom plan for your team? <a href="#contact" className="text-blue-600 font-medium">Contact us</a> for enterprise pricing.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
