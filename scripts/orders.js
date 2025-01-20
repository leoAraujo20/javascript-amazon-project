import { loadProductsFetch, getProduct } from "../data/products.js";
import { orders } from "../data/orders.js";
import { addToCart, calculateCartQuantity } from "../data/cart.js";
import { formatCurrency } from "./utils/money.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

await loadProductsFetch();

function renderOrderGrid() {
    let orderGridHTML = "";
    orders.forEach((order) => {
        const orderTimeString = dayjs(order.orderTime).format("MMMM D");
        orderGridHTML += `
            <div class="order-container">

                <div class="order-header">
                    <div class="order-header-left-section">
                        <div class="order-date">
                            <div class="order-header-label">Order Placed:</div>
                            <div>${orderTimeString}</div>
                        </div>
                        <div class="order-total">
                            <div class="order-header-label">Total:</div>
                            <div>$${formatCurrency(order.totalCostCents)}</div>
                        </div>
                    </div>

                    <div class="order-header-right-section">
                        <div class="order-header-label">Order ID:</div>
                        <div>${order.id}</div>
                    </div>
                </div>

                <div class="order-details-grid js-order-details-grid">
                    ${renderProductDetailsGrid(order)}
                </div>
            </div>
        `;
    });
    document.querySelector(".js-orders-grid").innerHTML = orderGridHTML;
}

function renderProductDetailsGrid(order) {
    let productDetailsHTML = "";
    order.products.forEach((productDetails) => {
        const matchingProduct = getProduct(productDetails.productId);
        const deliveryDate = productDetails.estimatedDeliveryTime;
        const deliveryDateString = dayjs(deliveryDate).format("MMMM D");
        productDetailsHTML += `
            <div class="product-image-container">
                <img src="${matchingProduct.image}">
            </div>

            <div class="product-details">
                <div class="product-name">
                    ${matchingProduct.name}
                </div>
                <div class="product-delivery-date">
                    ${deliveryDateString}
                </div>
                <div class="product-quantity">
                    Quantity: ${productDetails.quantity}
                </div>
                <button class="buy-again-button button-primary js-buy-again-button" data-product-id="${productDetails.productId}">
                    <img class="buy-again-icon" src="images/icons/buy-again.png">
                    <span class="buy-again-message">Buy it again</span>
                </button>
            </div>

            <div class="product-actions">
                <a href="tracking.html?orderId=${order.id}&productId=${productDetails.productId}">
                    <button class="track-package-button button-secondary">
                        Track package
                    </button>
                </a>
            </div>
        `;
    });
    return productDetailsHTML;
}

renderOrderGrid();

document.querySelectorAll(".js-buy-again-button").forEach((button) => {
    button.addEventListener("click", () => {
        addToCart(button.dataset.productId, 1);

        button.innerHTML = "Added";
        setTimeout(() => {
            button.innerHTML = `
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message">Buy it again</span>`;
        }, 1000);
    });
});
