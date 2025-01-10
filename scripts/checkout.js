import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderCheckoutHeaderHTML } from "./checkout/checkoutHeader.js";
import "../data/cart-oop.js";

renderCheckoutHeaderHTML();
renderOrderSummary();
renderPaymentSummary();