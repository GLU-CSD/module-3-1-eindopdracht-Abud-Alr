document.addEventListener("DOMContentLoaded", () => {
    const cart = [];
    const cartCount = document.getElementById("cart-count");
    const cartItems = document.getElementById("cart-items");
    const addToCartButtons = document.querySelectorAll(".add-to-cart");

    addToCartButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            const product = event.target.parentElement;
            const productName = product.querySelector("h3").innerText;
            const productPrice = product.querySelector("p").innerText;
            
            cart.push({ name: productName, price: productPrice });
            updateCart();
        });
    });

    function updateCart() {
        cartCount.innerText = cart.length;
        cartItems.innerHTML = "";

        if (cart.length === 0) {
            cartItems.innerHTML = "<p>Cart is empty</p>";
        } else {
            cart.forEach(item => {
                const cartItem = document.createElement("p");
                cartItem.innerText = `${item.name} - ${item.price}`;
                cartItems.appendChild(cartItem);
            });
        }
    }
});
