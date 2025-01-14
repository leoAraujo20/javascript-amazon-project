import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderCheckoutHeaderHTML } from "./checkout/checkoutHeader.js";
import { loadProducts } from "../data/products.js";
// import "../data/backend-pratice.js";

loadProducts(() => {
    renderCheckoutHeaderHTML();
    renderOrderSummary();
    renderPaymentSummary();
});
