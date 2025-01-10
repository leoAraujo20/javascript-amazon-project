function Cart(localStorageKey) {
    const cart = {
        cartItems: undefined,

        loadFromStorage() {
            this.cartItems = JSON.parse(localStorage.getItem(localStorageKey));
            if (!this.cartItems) {
                this.cartItems = [
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
                ];
            }
        },

        saveToStorage() {
            localStorage.setItem(
                localStorageKey,
                JSON.stringify(this.cartItems)
            );
        },

        addToCart(productId, productQuantity) {
            let matchingItem;
            this.cartItems.forEach((cartItem) => {
                if (productId === cartItem.productId) {
                    matchingItem = cartItem;
                }
            });

            if (matchingItem) {
                matchingItem.quantity += productQuantity;
            } else {
                this.cartItems.push({
                    productId: productId,
                    quantity: productQuantity,
                    deliveryOptionId: "1",
                });
            }

            this.saveToStorage();
        },

        removeFromCart(productId) {
            const newCart = [];

            this.cartItems.forEach((cartItem) => {
                if (productId !== cartItem.productId) {
                    newCart.push(cartItem);
                }
            });

            this.cartItems = newCart;

            this.saveToStorage();
        },

        calculateCartQuantity() {
            let cartQuantity = 0;
            this.cartItems.forEach((item) => {
                cartQuantity += item.quantity;
            });
            return cartQuantity;
        },

        updateQuantity(productId, newQuantity) {
            this.cartItems.forEach((cartItem) => {
                if (productId === cartItem.productId) {
                    cartItem.quantity = newQuantity;
                }
                this.saveToStorage();
            });
        },

        updateDeliveryOption(productId, deliveryOptionId) {
            let matchingItem;
            this.cartItems.forEach((cartItem) => {
                if (productId === cartItem.productId) {
                    matchingItem = cartItem;
                }
            });

            matchingItem.deliveryOptionId = deliveryOptionId;

            this.saveToStorage();
        },
    };

    return cart;
}

const cart = Cart("cart-oop");
cart.loadFromStorage();
console.log(cart);

const businessCart = Cart("cart=business");
businessCart.loadFromStorage();
businessCart.addToCart("83d4ca15-0f35-48f5-b7a3-1ea210004f2e", 1);
console.log(businessCart);
