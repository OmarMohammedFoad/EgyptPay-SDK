// src/interfaces/UnifiedTypes.ts

export type Currency = 'EGP' | 'USD'; // Restrict currencies to what we support

export interface CustomerDetails {
  name: string;
  email: string;
  phone: string;
  address?: string;
  city?: string;
  country?: string;
  zip?: string;
  ip?: string;


}

// This is what the Developer sends TO us
export interface PaymentRequest {
  amount: number;       // Keep it simple (e.g., 100.00)
  currency: Currency;
  orderId: string;      // Unique ID from their database
  description: string;  // What are they buying?
  customer: CustomerDetails;
  callbackUrl: string;  // Where to redirect after success
}

// This is what we send BACK to the Developer
export interface PaymentResponse {
  success: boolean;
  paymentUrl?: string;         // The link to Fawry/Paymob page
  transactionId?: string;      // The provider's ID (useful for support)
  originalResponse?: any;      // Debugging data (raw provider response)
}
