import { IPaymentGatway } from "./interfaces/IPaymentGatway";
import { PaymobProvider } from "./Provider/PaymobProvider";
import { PayTabsProvider } from "./Provider/PaytapsProvider";
export type Provider = 'Paymob' | 'PayTabs';

export interface PaymentConfig {
  provider: Provider;
  credentials: {
    apiKey?: string;
    integrationId?: string; // For Paymob
    iframeId?: string; // For Paymob
    profileId?: string; // For PayTabs
    serverKey?: string; // For PayTabs
  }
}

export class EgyptPay {
  private gateway: IPaymentGatway;

  constructor(config: PaymentConfig) {
    if (config.provider === "PayTabs") {
      if (!config.credentials.profileId || !config.credentials.serverKey) {
        throw new Error("Missing PayTabs credentials");
      }

      this.gateway = new PayTabsProvider(config.credentials.profileId, config.credentials.serverKey)
    } else if (config.provider === "Paymob") {
      if (!config.credentials.apiKey || !config.credentials.integrationId || !config.credentials.iframeId) {
        throw new Error("Missing Paymob credentials");
      }
      this.gateway = new PaymobProvider(
        config.credentials.apiKey,
        config.credentials.integrationId,
        config.credentials.iframeId
      );
    } else {
      throw new Error("Unsupported payment provider");
    }


  }


  getGateway(): IPaymentGatway {
    return this.gateway;
  }
}


