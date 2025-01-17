import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderCheckoutHeaderHTML } from "./checkout/checkoutHeader.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";
// import "../data/backend-pratice.js";

async function loadPage() {
    try {
        await loadProductsFetch();

        const value1 = await new Promise((resolve) => {
            loadCart(() => {
                resolve("Value1");
            });
        });
    } catch (error) {
        console.log("Unexpected error occurred");
    }

    renderCheckoutHeaderHTML();
    renderOrderSummary();
    renderPaymentSummary();
}

loadPage();

/*
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
*/

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
