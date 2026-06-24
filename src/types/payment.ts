export type PaymentMethodType = 'API' | 'MANUAL';

export interface PaymentProvider {
  id: string;
  name: string;
  logo: string;
  type: PaymentMethodType;
  description: string;
  regions: string[];
  instructions?: string; // For manual payments
}

export const PAYMENT_PROVIDERS: PaymentProvider[] = [
  // International
  {
    id: 'paypal',
    name: 'PayPal',
    logo: '/assets/payments/paypal.png',
    type: 'API',
    description: 'Instant verification via PayPal balance or Card.',
    regions: ['Global']
  },
  {
    id: 'stripe',
    name: 'Stripe',
    logo: '/assets/payments/stripe.png',
    type: 'API',
    description: 'Secure credit and debit card payments.',
    regions: ['Global']
  },
  // India
  {
    id: 'upi',
    name: 'UPI / GPay / PhonePe',
    logo: '/assets/payments/upi.png',
    type: 'API',
    description: 'Instant UPI transfer via any app.',
    regions: ['India']
  },
  // Bangladesh
  {
    id: 'bkash',
    name: 'bKash',
    logo: '/assets/payments/bkash.png',
    type: 'MANUAL',
    description: 'Manual verification via Send Money.',
    regions: ['Bangladesh'],
    instructions: 'Send the total amount to our merchant number: +8801XXXXXXXXX. Use your IGN as reference.'
  },
  {
    id: 'nagad',
    name: 'Nagad',
    logo: '/assets/payments/nagad.png',
    type: 'MANUAL',
    description: 'Manual verification via Send Money.',
    regions: ['Bangladesh'],
    instructions: 'Send the total amount to our merchant number: +8801XXXXXXXXX.'
  },
  // Pakistan
  {
    id: 'easypaisa',
    name: 'EasyPaisa',
    logo: '/assets/payments/easypaisa.png',
    type: 'MANUAL',
    description: 'Manual verification via Transfer.',
    regions: ['Pakistan'],
    instructions: 'Transfer to Account: 03XXXXXXXXX (Title: MineFuture Network).'
  },
  {
    id: 'jazzcash',
    name: 'JazzCash',
    logo: '/assets/payments/jazzcash.png',
    type: 'MANUAL',
    description: 'Manual verification via Transfer.',
    regions: ['Pakistan'],
    instructions: 'Transfer to Account: 03XXXXXXXXX.'
  }
];
