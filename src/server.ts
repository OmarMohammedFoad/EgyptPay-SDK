import cors from "cors";
import dotenv from "dotenv";
import express, { Application, Request, Response } from "express";
import { EgyptPay } from "./PaymentManager";
const app: Application = express();
dotenv.config();

app.use(cors());
app.use(express.json());



const PORT = process.env.PORT || 3000;
console.log("PAYTABS_PROFILE_ID:", process.env.PAYTABS_PROFILE_ID, "PAYTABS_SERVER_KEY:", process.env.PAYTABS_SERVER_KEY);






app.get('/', (req: Request, res: Response) => {
  res.send('Payment Gateway Server is running');
});

app.post('/initiate-payment', async (req: Request, res: Response) => {
  try {
    console.log(req.body, "body");

    const {
      amount,
      currency,
      customer,
      provider
    } = req.body
    if (!amount || !customer || !provider) {
      return res.status(400).json({ error: 'Missing amount, customer details, or provider' });
    }


    const initialPayment = new EgyptPay({
      credentials: getProviderCredientials(provider),
      provider: provider
    }
    );



    const paymentResponse = await initialPayment.getGateway().initiatePayment({
      amount: parseFloat(amount),
      currency: currency || 'EGP',
      orderId: 'ORDER_' + Date.now(),
      description: "Payment Description",
      customer: {
        name: customer.name,
        email: customer.email,
        phone: customer.phone
      },
      callbackUrl: 'https://your-callback-url.com'
    });


    res.json({ url: paymentResponse.paymentUrl });
  }

  catch (error: any) {
    res.status(500).json({ error: 'Payment initiation failed', details: error.message });
  }
});


function getProviderCredientials(provider: string) {
  switch (provider) {
    case 'paytabs':
      return {
        profileId: process.env.PAYTABS_PROFILE_ID || '',
        serverKey: process.env.PAYTABS_SERVER_KEY || '',
      };
    default:
      return {
        profileId: process.env.PAYTABS_PROFILE_ID || '',
        serverKey: process.env.PAYTABS_SERVER_KEY || '',
      };
  }
}


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
