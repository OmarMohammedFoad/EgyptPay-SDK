# 🇪🇬 EgyptPay SDK: Unified Payment Gateway for Egypt

**EgyptPay** is a robust, type-safe TypeScript library that unifies multiple Egyptian payment gateways (Paymob, PayTabs, Fawry) into a single, standardized interface. It is designed using the **Adapter Design Pattern** to solve the problem of API fragmentation in the Egyptian market.

## 🚀 The Problem
Integrating payments in Egypt is painful. Every provider has a different implementation:
- **Fawry** requires complex SHA-256 signature hashing.
- **Paymob** requires a 3-step authentication chain (Auth -> Order -> Key).
- **PayTabs** requires specific headers and payload structures.

Switching providers usually means rewriting the entire payment logic.

## 💡 The Solution
**EgyptPay** abstracts these complexities behind a clean, consistent interface. You can switch from Paymob to PayTabs by changing *one line of configuration*.

## 🏗 Architecture & Design Patterns

I built this project to master advanced software architecture principles. Here are the core patterns applied:

### 1. Adapter Pattern (Structural)
**Why?** To make incompatible interfaces work together.
- **Implementation:** I created a generic contract `IPaymentGateway` with a standard `initiatePayment()` method.
- **Result:** The core application doesn't know (or care) if it's talking to Paymob or Fawry. It just sends a standard request, and the specific *Adapter* handles the translation.

### 2. Factory Pattern (Creational)
**Why?** To simplify object creation.
- **Implementation:** The `PaymentManager` class acts as a factory. The developer requests a provider by string name (e.g., `'paymob'`), and the factory instantiates the correct class with the necessary API keys and configuration.

### 3. Strategy Pattern (Behavioral)
**Why?** To allow dynamic switching of algorithms at runtime.
- **Implementation:** The system can select the payment strategy based on the user's choice (or potentially via AI rules) without changing the client code.

## 🛠 Tech Stack
- **Language:** TypeScript (Strict Mode for maximum type safety).
- **Runtime:** Node.js.
- **HTTP Client:** Axios.
- **Architecture:** OOP (Interfaces, Classes, Abstract Types).

## 📦 Installation

```bash
npm install egypt-payment-sdk
