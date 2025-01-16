import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderCheckoutHeaderHTML } from "./checkout/checkoutHeader.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";
// import "../data/backend-pratice.js";

Promise.all([
    loadProductsFetch(),
    new Promise((resolve) => {
        loadCart(() => {
            resolve("value2");
        });
    }),
]).then((valuesArray) => {
    console.log(valuesArray);
    renderCheckoutHeaderHTML();
    renderOrderSummary();
    renderPaymentSummary();
});

/*
new Promise((resolve) => {
    loadProducts(() => {
        resolve("value1");
    });
}).then((value) => {
    return new Promise((resolve) => {
        loadCart(() => {
            console.log(value);
            resolve();
        });
    });
}).then(() => {
    renderCheckoutHeaderHTML();
    renderOrderSummary();
    renderPaymentSummary();
});
*/

/*
loadProducts(() => {
    renderCheckoutHeaderHTML();
    renderOrderSummary();
    renderPaymentSummary();
});
*/
