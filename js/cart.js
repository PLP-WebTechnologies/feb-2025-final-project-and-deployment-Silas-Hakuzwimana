// cart.js
const cartBadge = document.getElementById("cart-badge");
const cartItems = document.getElementById("cart-items");
// Function to add item to the cart
function addToCart(id, title, price, img) {
  const product = {
    id: id,
    title: title,
    price: parseFloat(price), // Ensure price is a number
    img: img,
    quantity: 1,
  };

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existingProductIndex = cart.findIndex((item) => item.id === id);
  if (existingProductIndex !== -1) {
    cart[existingProductIndex].quantity += 1;
    alert("Product quantity updated in cart");
  } else {
    cart.push(product);
    alert("Product added to cart");
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  // Update cart count in the navbar (if necessary)
  updateCartCount();
}

// Function to update the cart count
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  // Update the cart icon with the total count
  const cartBadge = document.querySelector(".badge");
  if (cartBadge) {
    cartBadge.textContent = cartCount;
  }
}

// Function to display the cart
function displayCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartContainer = document.querySelector("#cart-items");

  if (!cartContainer) return;

  // Clear the container before displaying new cart items
  cartContainer.innerHTML = "";

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  cart.forEach((item) => {
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");

    cartItem.innerHTML = `
        <div class="cart-item-image">
          <img src="${item.img}" alt="${item.title}" />
        </div>
        <div class="cart-item-details">
          <h5>${item.title}</h5>
          <p>Price: $${item.price}</p>
          <p>Quantity: ${item.quantity}</p>
        </div>
        <div class="cart-item-actions">
          <button class="btn btn-sm btn-danger" onclick="removeItem(${item.id})">Remove</button>
        </div>
      `;

    cartContainer.appendChild(cartItem);
  });
}

// Function to remove an item from the cart
function removeItem(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter((item) => item.id !== id);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
  updateCartCount();
}

// Call the updateCartCount when the page loads to ensure the cart is updated
document.addEventListener("DOMContentLoaded", updateCartCount);

// Adding event listener for add-to-cart buttons
const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");
addToCartButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const id = button.getAttribute("data-id");
    const title = button.getAttribute("data-title");
    const price = button.getAttribute("data-price");
    const img = button.getAttribute("data-img");

    addToCart(id, title, price, img);
  });
});

// Update cart badge with total quantity of items
cartBadge.textContent = cart.reduce((total, item) => total + item.quantity, 0);
