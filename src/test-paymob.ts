import {
  PaymobProvider
} from "./Provider/PaymobProvider";

const API_KEY = "ZXlKaGJHY2lPaUpJVXpVeE1pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SmpiR0Z6Y3lJNklrMWxjbU5vWVc1MElpd2ljSEp2Wm1sc1pWOXdheUk2TVRBMk16YzNOU3dpYm1GdFpTSTZJbWx1YVhScFlXd2lmUS4xb0p0NTlLcDhpbTF2TTRXeGxRM25WNUVjelBKTnVqLVotaTV4U2RZTldrV0QzMmdmRlE1ZHMtYUg4Skx3dFhpMkNEREdsMzMtODJFaVpiSkRfdmZIUQ== ";
const INTEGRATION_ID = "5215117";
const IFRAME_ID = "943918";

const paymob = new PaymobProvider(API_KEY, INTEGRATION_ID, IFRAME_ID);
async function runTest() {
  console.log("🚀 Starting Paymob Test...");
  try {
    const response = await paymob.initiatePayment({
      amount: 100.00, // 100 EGP
      currency: 'EGP',
      orderId: 'ORDER_' + Date.now(), // Unique ID
      description: 'Test Payment',
      customer: {
        name: 'Ahmed Mohamed',
        email: 'test@paymob.com',
        phone: '+201000000000'
      },
      callbackUrl: 'https://google.com'
    });

    console.log('✅ Success! Payment URL:');
    console.log(response);
  } catch (error) {
    console.error('❌ Failed:', error);
  }
}

runTest();
