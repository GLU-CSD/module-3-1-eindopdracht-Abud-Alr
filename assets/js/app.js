document.addEventListener("DOMContentLoaded", () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartCount = document.getElementById("cart-count");
    const cartItems = document.getElementById("cart-items");
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    const checkoutButton = document.getElementById("checkout");

    function updateCart() {
        cartCount.innerText = cart.length;
        cartItems.innerHTML = "";

        if (cart.length === 0) {
            cartItems.innerHTML = "<p>Cart is empty</p>";
        } else {
            cart.forEach((item, index) => {
                const cartItem = document.createElement("div");
                cartItem.classList.add("cart-item");
                cartItem.innerHTML = `
                    <p>${item.name} - ${item.price}</p>
                    <button class="remove-from-cart" data-index="${index}">Remove</button>
                `;
                cartItems.appendChild(cartItem);
            });

            document.querySelectorAll(".remove-from-cart").forEach(button => {
                button.addEventListener("click", (event) => {
                    const index = event.target.getAttribute("data-index");
                    cart.splice(index, 1);
                    saveCart();
                    updateCart();
                });
            });
        }
    }

    function saveCart() {
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    addToCartButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            const product = event.target.parentElement;
            const productName = product.querySelector("h3").innerText;
            const productPrice = product.querySelector("p").innerText;

            cart.push({ name: productName, price: productPrice });
            saveCart();
            updateCart();
        });
    });

    checkoutButton.addEventListener("click", () => {
        if (cart.length === 0) {
            alert("Your cart is empty.");
            return;
        }

        alert("Thank you for your purchase!");
        cart = [];
        saveCart();
        updateCart();
    });

    updateCart();
});
