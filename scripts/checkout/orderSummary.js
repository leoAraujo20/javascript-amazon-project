import {
    cart,
    removeFromCart,
    calculateCartQuantity,
    updateQuantity,
    updateDeliveryOption,
} from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import {
    calculateDeliveryDate,
    deliveryOptions,
    getDeliveryOption,
} from "../../data/deliveryOptions.js";
import { renderPaymentSummary } from "./paymentSummary.js";
import { renderCheckoutHeaderHTML } from "./checkoutHeader.js";

export function renderOrderSummary() {
    let cartSummaryHTML = "";

    cart.forEach((cartItem) => {
        const productId = cartItem.productId;

        const matchingProduct = getProduct(productId);

        const deliveryOptionId = cartItem.deliveryOptionId;
        const deliveryOption = getDeliveryOption(deliveryOptionId);
        const deliveryDate = calculateDeliveryDate(deliveryOption);
        const dateString = deliveryDate.format("dddd, MMMM, D");

        cartSummaryHTML += `
        <div class="cart-item-container js-cart-item-container js-cart-item-container-${
            matchingProduct.id
        }">
            <div class="delivery-date">
                Delivery date: ${dateString}
            </div>
    
            <div class="cart-item-details-grid">
                <img class="product-image" src="${matchingProduct.image}">
    
                <div class="cart-item-details">
                    <div class="product-name js-product-name-${matchingProduct.id}">
                        ${matchingProduct.name}
                    </div>
                    <div class="product-price">
                        ${matchingProduct.getPrice()}
                    </div>
                    <div class="product-quantity js-product-quantity-${
                        matchingProduct.id
                    }">
                        <span>
                            Quantity: <span class="quantity-label js-quantity-label-${
                                matchingProduct.id
                            }">${cartItem.quantity}</span>
                        </span>
                        <span class="update-quantity-link js-update-quantity-link link-primary" data-product-id="${
                            matchingProduct.id
                        }">
                            Update
                        </span>
                        <input class="quantity-input js-quantity-input-${
                            matchingProduct.id
                        }">
                        <span class="save-quantity-link js-save-quantity-link link-primary" data-product-id="${
                            matchingProduct.id
                        }">
                            Save
                        </span>
                        <span class="delete-quantity-link link-primary js-delete-link js-delete-link-${
                            matchingProduct.id
                        }" data-product-id="${matchingProduct.id}">
                            Delete
                        </span>
                    </div>
                </div>
    
                <div class="delivery-options js-delivery-options">
                    <div class="delivery-options-title">
                        Choose a delivery option:
                    </div>
                    ${deliveryOptionsHTML(
                        matchingProduct.id,
                        cartItem.deliveryOptionId
                    )}
                </div>
            </div>
        </div>
        `;
    });

    function deliveryOptionsHTML(matchingProductId, deliveryId) {
        let html = "";

        deliveryOptions.forEach((deliveryOption) => {
            const deliveryDate = calculateDeliveryDate(deliveryOption);
            const dateString = deliveryDate.format("dddd, MMMM, D");
            const priceString =
                deliveryOption.priceCents === 0
                    ? "FREE"
                    : `$${formatCurrency(deliveryOption.priceCents)}`;
            const isChecked = deliveryOption.id === deliveryId;
            html += `
            <div class="delivery-option js-delivery-option" data-product-id="${matchingProductId}" data-delivery-option-id="${
                deliveryOption.id
            }">
                <input type="radio" ${
                    isChecked ? "checked" : ""
                } class="delivery-option-input" name="delivery-option-${matchingProductId}">
                <div>
                    <div class="delivery-option-date">
                        ${dateString}
                    </div>
                    <div class="delivery-option-price">
                        ${priceString} - Shipping
                    </div>
                </div>
            </div>
            `;
        });

        return html;
    }

    document.querySelector(".js-order-summary").innerHTML = cartSummaryHTML;

    document.querySelectorAll(".js-delete-link").forEach((link) => {
        link.addEventListener("click", () => {
            const productId = link.dataset.productId;
            removeFromCart(productId);

            updateCartQuantity();
            renderCheckoutHeaderHTML();
            renderOrderSummary();
            renderPaymentSummary();
        });
    });

    function updateCartQuantity() {
        const cartQuantity = calculateCartQuantity();
        document.querySelector(
            ".js-return-to-home-link"
        ).innerHTML = `${cartQuantity} Items`;
    }

    updateCartQuantity();

    document.querySelectorAll(".js-update-quantity-link").forEach((link) => {
        link.addEventListener("click", () => {
            const productId = link.dataset.productId;
            const container = document.querySelector(
                `.js-cart-item-container-${productId}`
            );
            container.classList.add("is-editing-quantity");
        });
    });

    document.querySelectorAll(".js-save-quantity-link").forEach((link) => {
        link.addEventListener("click", () => {
            const productId = link.dataset.productId;
            const container = document.querySelector(
                `.js-cart-item-container-${productId}`
            );
            const quantityInput = document.querySelector(
                `.js-quantity-input-${productId}`
            );
            const newQuantity = Number(quantityInput.value);
            updateQuantity(productId, newQuantity);
            const quantityLabel = document.querySelector(
                `.js-quantity-label-${productId}`
            );
            quantityLabel.innerHTML = newQuantity;
            updateCartQuantity();
            container.classList.remove("is-editing-quantity");
            renderCheckoutHeaderHTML();
            renderPaymentSummary();
        });
    });

    document.querySelectorAll(".js-delivery-option").forEach((element) => {
        element.addEventListener("click", () => {
            const { productId, deliveryOptionId } = element.dataset;
            updateDeliveryOption(productId, deliveryOptionId);
            renderCheckoutHeaderHTML();
            renderOrderSummary();
            renderPaymentSummary();
        });
    });
}
