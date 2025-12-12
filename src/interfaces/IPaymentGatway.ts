import { PaymentRequest, PaymentResponse } from "./UnifiedTypes";

export interface IPaymentGatway {

  initiatePayment(paymentDetails: PaymentRequest): Promise<PaymentResponse>;

  // for now to verify payment transaction;
  verifyPayment?(transactionId: string): Promise<any>;
}
