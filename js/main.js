// Auto-update footer year
document.getElementById("footerYear").textContent = new Date().getFullYear();
// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  });
  
  // Product filter functionality
  function filterProducts() {
    const searchInput = document.getElementById("search-input").value.toLowerCase();
    const products = document.querySelectorAll(".product-item");
  
    products.forEach(product => {
      const productName = product.querySelector("h3").textContent.toLowerCase();
      if (productName.includes(searchInput)) {
        product.style.display = "block";
      } else {
        product.style.display = "none";
      }
    });
  }
  
  // Add to cart functionality

function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(productId);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Product added to cart!");
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    const cartItems = document.getElementById("cart-items");
    if (cartItems) {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      cartItems.innerHTML = cart.map(id => `<p>Product ID: ${id}</p>`).join("");
    }
  });