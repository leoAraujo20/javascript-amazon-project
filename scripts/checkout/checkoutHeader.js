import { calculateCartQuantity } from "../../data/cart.js"

export function renderCheckoutHeaderHTML(){
    const cartQuantity = calculateCartQuantity()
    const checkoutHeaderEl = document.querySelector(".js-checkout-header-middle-section") 
    const html = `
        Checkout (<a class="return-to-home-link js-return-to-home-link" href="amazon.html">${cartQuantity}</a>)
    `
    checkoutHeaderEl.innerHTML = html;
}