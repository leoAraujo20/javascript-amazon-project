import { loadFromStorage, cart } from "../../data/cart.js";
import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
import { loadProducts, loadProductsFetch } from "../../data/products.js";

describe("Test suit: Render order summary", () => {
    beforeAll((done) => {
        loadProductsFetch().then(() => {
            done();
        });
    });

    beforeEach(() => {
        spyOn(localStorage, "setItem");

        document.querySelector(".js-test-container").innerHTML = `
            <div class="js-return-to-home-link"></div>
            <div class="js-checkout-header-middle-section"></div>
            <div class="js-order-summary"></div>
            <div class="js-payment-summary"></div>
        `;

        spyOn(localStorage, "getItem").and.callFake(() => {
            return JSON.stringify([
                {
                    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                    quantity: 2,
                    deliveryOptionId: "1",
                },
                {
                    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
                    quantity: 1,
                    deliveryOptionId: "2",
                },
            ]);
        });
        loadFromStorage();
        renderOrderSummary();
    });

    afterEach(() => {
        document.querySelector(".js-test-container").innerHTML = ``;
    });

    it("displays the cart", () => {
        expect(
            document.querySelectorAll(".js-cart-item-container").length
        ).toEqual(2);
        expect(
            document.querySelector(
                ".js-product-quantity-e43638ce-6aa0-4b85-b27f-e1d07eb678c6"
            ).innerText
        ).toContain("2");
        expect(
            document.querySelector(
                ".js-product-quantity-15b6fc6f-327a-4ec4-896f-486349e85a3d"
            ).innerText
        ).toContain("1");
        expect(
            document.querySelector(
                ".js-product-name-e43638ce-6aa0-4b85-b27f-e1d07eb678c6"
            ).innerText
        ).toEqual("Black and Gray Athletic Cotton Socks - 6 Pairs");
        expect(
            document.querySelector(
                ".js-product-name-15b6fc6f-327a-4ec4-896f-486349e85a3d"
            ).innerText
        ).toEqual("Intermediate Size Basketball");
    });

    it("Removes a product from the cart", () => {
        document
            .querySelector(
                ".js-delete-link-e43638ce-6aa0-4b85-b27f-e1d07eb678c6"
            )
            .click();
        expect(
            document.querySelectorAll(".js-cart-item-container").length
        ).toEqual(1);
        expect(
            document.querySelector(
                ".js-cart-item-container-e43638ce-6aa0-4b85-b27f-e1d07eb678c6"
            )
        ).toBe(null);
        expect(
            document.querySelector(
                ".js-cart-item-container-15b6fc6f-327a-4ec4-896f-486349e85a3d"
            )
        ).not.toBe(1);
        expect(cart.length).toEqual(1);
        expect(cart[0].productId).toEqual(
            "15b6fc6f-327a-4ec4-896f-486349e85a3d"
        );
        expect(
            document.querySelector(
                ".js-product-name-15b6fc6f-327a-4ec4-896f-486349e85a3d"
            ).innerText
        ).toEqual("Intermediate Size Basketball");
    });
});
