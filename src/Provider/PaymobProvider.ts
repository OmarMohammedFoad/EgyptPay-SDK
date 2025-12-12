import axios from "axios";
import { IPaymentGatway } from "../interfaces/IPaymentGatway";
import { PaymentRequest, PaymentResponse } from "../interfaces/UnifiedTypes";



export class PaymobProvider implements IPaymentGatway {
  private apiKey: string;
  private integrationId: string;
  private iframeId: string;
  private baseUrl: string = 'https://accept.paymob.com/api';
  constructor(apiKey: string, integrationId: string, iframeId: string) {

    this.apiKey = apiKey;
    this.integrationId = integrationId;
    this.iframeId = iframeId;
  }

  async initiatePayment(req: PaymentRequest): Promise<PaymentResponse> {
    try {
      const authToken = await this.authinticate();

      const orderId = await this.registerOrder(authToken, req);

      const paymentKey = await this.generatePaymentKey(authToken, orderId, req);


      const paymentUrl = `https://accept.paymob.com/api/acceptance/iframes/${this.iframeId}?payment_token=${paymentKey}`;

      return {
        success: true,
        paymentUrl: paymentUrl,
        transactionId: orderId.toString()
      }
    } catch (error: any) {
      console.log(error);

      throw new Error(`Paymob Initiation Failed: ${error.message}`);

    }
  }


  private async authinticate(): Promise<string> {

    try {
      const { data } = await axios.post(`${this.baseUrl}/auth/tokens`, {
        api_key: this.apiKey
      });
      return data.token;
    } catch (error) {
      throw new Error("Authentication failed");
    }
  }

  private async registerOrder(token: string, req: PaymentRequest): Promise<number> {
    const amountInCents = Math.round(req.amount * 100);
    try {
      const response = await axios.post(`${this.baseUrl}/ecommerce/orders`, {
        auth_token: token,
        delivery_needed: 'false',
        amount_cents: amountInCents,
        currency: req.currency,
        merchant_order_id: req.orderId,
        items: []
      });
      return response.data.id;
    } catch (error) {
      throw new Error("Order registration failed");
    }

  }
  private async generatePaymentKey(token: string, orderId: number, req: PaymentRequest): Promise<string> {
    const amountInCents = req.amount * 100;
    const billingData = {
      email: req.customer.email,
      first_name: req.customer.name.split(' ')[0] || 'NA',
      last_name: req.customer.name.split(' ')[1] || 'NA',
      phone_number: req.customer.phone,
      apartment: "NA",
      floor: "NA",
      street: "NA",
      building: "NA",
      shipping_method: "NA",
      postal_code: "NA",
      city: "NA",
      country: "NA",
      state: "NA"
    }
    try {
      const { data } = await axios.post(`${this.baseUrl}/acceptance/payment_keys`, {
        auth_token: token,
        amount_cents: amountInCents,
        orderId: orderId,
        billing_data: billingData,
        currency: req.currency,
        integration_id: this.integrationId,
        lock_order_when_paid: "false"
      });

      return data.token;
    } catch (error: any) {
      console.log(error, "error");

      throw new Error(`Payment key generation failed: ${error.message}`);
    }


  }
}
