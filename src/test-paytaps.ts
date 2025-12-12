// test-paytabs.ts
import { PayTabsProvider } from './Provider/PaytapsProvider';

// REPLACE WITH YOUR REAL KEYS
const PROFILE_ID = "131118";
const SERVER_KEY = "SMJ9MRNRRZ-JHDMLJM9TL-WLNKMKHMG2";

const paytabs = new PayTabsProvider(PROFILE_ID, SERVER_KEY);

async function runTest() {
  console.log("🚀 Starting PayTabs Test...");
  try {
    const response = await paytabs.initiatePayment({
      amount: 100.00,
      currency: 'EGP',
      orderId: 'ORDER_' + Date.now(),
      description: 'Test T-Shirt',
      customer: {
        name: 'Test Developer',
        email: 'dev@test.com',
        phone: '01000000000'
      },
      callbackUrl: 'https://google.com'
    });

    console.log('✅ Success!');
    console.log(response);

    console.log('🔗 Redirect URL:', response.paymentUrl);
    console.log('🆔 Transaction Ref:', response.transactionId);
  } catch (error) {
    console.error('❌ Failed:', error);
  }
}

runTest();
