import axios from "axios";
import { IPaymentGatway } from "../interfaces/IPaymentGatway";
import { PaymentRequest, PaymentResponse } from "../interfaces/UnifiedTypes";
export class PayTabsProvider implements IPaymentGatway {

  private profileId: string;
  private serverKey: string;
  private baseUrl: string = 'https://secure-egypt.paytabs.com/';

  constructor(profileId: string, serverKey: string) {
    this.profileId = profileId;
    this.serverKey = serverKey;
  }
  async initiatePayment(req: PaymentRequest): Promise<PaymentResponse> {

    const payload = {
      "profile_id": parseInt(this.profileId),
      "tran_type": "sale",
      "tran_class": "ecom",
      "cart_description": req.description,
      "cart_id": req.orderId,
      "cart_currency": req.currency,
      "cart_amount": req.amount,
      "customer_details": {
        "name": req.customer.name,
        "email": req.customer.email,
        "phone": req.customer.phone,
        street1: "NA",
        city: "NA",
        state: "NA",
        country: "EG",
        zip: "00000"
      },
      "callback": req.callbackUrl,
    }

    try {
      const { data } = await axios.post(`${this.baseUrl}/payment/request`, payload, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.serverKey
        }
      });

      if (data.redirect_url) {
        return {
          success: true,
          originalResponse: data,
          paymentUrl: data.redirect_url,
          transactionId: data.tran_ref

        }
      } else {
        throw new Error(`PayTaps Initiation Failed: ${data.message || 'No redirect URL received'}`);
      }
    } catch (error: any) {
      console.log(error);

      const msg = error.response?.data?.message || error.message;
      throw new Error(`PayTabs Connection Failed: ${msg}`);
    }

  }




}
