document.addEventListener("DOMContentLoaded", () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartCount = document.getElementById("cart-count");
    const cartItems = document.getElementById("cart-items");
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    const checkoutButton = document.getElementById("checkout");

    const searchInput = document.getElementById("search-input");
    const searchBtn = document.getElementById("search-btn");

    searchBtn.addEventListener("click", () => {
        const searchText = searchInput.value.toLowerCase();
        const products = document.querySelectorAll(".product");

        products.forEach(product => {
            const productName = product.querySelector("h3").innerText.toLowerCase();
            if (productName.includes(searchText)) {
                product.style.display = "block";
            } else {
                product.style.display = "none";
            }
        });
    });

    const minPrice = document.getElementById("min-price");
    const maxPrice = document.getElementById("max-price");
    const minPriceValue = document.getElementById("min-price-value");
    const maxPriceValue = document.getElementById("max-price-value");
    const applyFilterButton = document.querySelector(".apply-filter");

    minPrice.addEventListener("input", () => {
        minPriceValue.innerText = minPrice.value;
    });

    maxPrice.addEventListener("input", () => {
        maxPriceValue.innerText = maxPrice.value;
    });

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

const categoryCheckboxes = document.querySelectorAll(".category-checkbox");
const applyCategoryFilterButton = document.querySelector(".apply-category-filter");

applyCategoryFilterButton.addEventListener("click", () => {
    const selectedCategories = Array.from(categoryCheckboxes)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.value.toLowerCase());

    const products = document.querySelectorAll(".product");

    products.forEach(product => {
        const productName = product.querySelector("h3").innerText.toLowerCase();

        if (selectedCategories.length === 0) {
            product.style.display = "block";
        } else {
            const matchesCategory = selectedCategories.some(category => productName.includes(category));
            product.style.display = matchesCategory ? "block" : "none";
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('order-form-modal');
    const btn = document.getElementById('checkout');
    const span = document.getElementsByClassName('close')[0];
  
    btn.onclick = function() {
      modal.style.display = 'block';
    }
  
    span.onclick = function() {
      modal.style.display = 'none';
    }
  
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = 'none';
      }
    }
  
    const form = document.getElementById('order-form');
    form.addEventListener('submit', function(event) {
      event.preventDefault();
      if (validateForm()) {
        alert('Order submitted successfully!');
        modal.style.display = 'none';
        form.reset();
      }
    });
  
    function validateForm() {
      let valid = true;
      const inputs = form.querySelectorAll('input[required], select[required]');
      inputs.forEach(input => {
        if (!input.value.trim() || (input.type === 'checkbox' && !input.checked)) {
          valid = false;
          input.classList.add('error');
          input.nextElementSibling.textContent = 'This field is required';
        } else {
          input.classList.remove('error');
          input.nextElementSibling.textContent = '';
        }
      });
      return valid;
    }
  
    form.querySelectorAll('input[required], select[required]').forEach(input => {
      input.addEventListener('input', () => {
        if (input.value.trim() || (input.type === 'checkbox' && input.checked)) {
          input.classList.remove('error');
          input.nextElementSibling.textContent = '';
        }
      });
    });
  });

// Smooth scrolling function
function scrollToSection(target) {
  const element = document.querySelector(target);
  if (element) {
    window.scrollTo({
      top: element.offsetTop,
      behavior: 'smooth'
    });
  }
}

// Event listeners for buttons and links
document.addEventListener('DOMContentLoaded', () => {
  const scrollLinks = document.querySelectorAll('a[href^="#"], button[data-scroll-to]');

  scrollLinks.forEach(link => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const targetId = link.getAttribute('href') || link.getAttribute('data-scroll-to');
      scrollToSection(targetId);
    });
  });
});