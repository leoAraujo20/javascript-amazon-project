import { getProduct } from "../data/products.js";
import { loadProductsFetch } from "../data/products.js";
// import { orders } from "../data/orders.js";
import { getOrder } from "../data/orders.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

async function renderTrackingPage() {
    await loadProductsFetch();

    const url = new URL(window.location.href);
    const orderId = url.searchParams.get("orderId");
    const productId = url.searchParams.get("productId");
    const matchingOrder = getOrder(orderId);
    const matchingProduct = getProduct(productId);

 

    let matchingProductDetail;
    matchingOrder.products.forEach((productDetail) => {
        if (productDetail.productId === productId) {
            matchingProductDetail = productDetail;
        }
    });

    const currentDate = dayjs();
    const orderTime = dayjs(matchingOrder.orderTime);
    const deliveryTime = dayjs(matchingProductDetail.estimatedDeliveryTime);
    const percentProgress = ((currentDate - orderTime) / (deliveryTime - orderTime)) * 100 ;

    const trackingDetailsHTML = `
        <a class="back-to-orders-link link-primary" href="orders.html">
            View all orders
        </a>
  
        <div class="delivery-date">
            Arriving on ${dayjs(matchingProductDetail.estimatedDeliveryTime).format("dddd, MMMM DD")
            }
        </div>

        <div class="product-info">
            ${matchingProduct.name}
        </div>

        <div class="product-info">
            Quantity: ${matchingProductDetail.quantity}
        </div>

        <img class="product-image" src="${matchingProduct.image}">

        <div class="progress-labels-container">
            <div class="progress-label ${percentProgress < 50 ? 'current-status' : ''}">
                Preparing
            </div>
            <div class="progress-label ${percentProgress >= 50 && percentProgress > 100 ? 'current-status' : ''}">
                Shipped
            </div>
            <div class="progress-label ${percentProgress >= 100 ? 'current-status' : ''}">
                Delivered
            </div>
        </div>

        <div class="progress-bar-container">
            <div class="progress-bar" style="width: ${percentProgress}%"></div>
        </div>
    `;

    document.querySelector(".js-order-tracking").innerHTML = trackingDetailsHTML;
}

renderTrackingPage();
