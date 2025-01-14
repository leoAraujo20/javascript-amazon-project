import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderCheckoutHeaderHTML } from "./checkout/checkoutHeader.js";
import "../data/backend-pratice.js";

renderCheckoutHeaderHTML();
renderOrderSummary();
renderPaymentSummary();