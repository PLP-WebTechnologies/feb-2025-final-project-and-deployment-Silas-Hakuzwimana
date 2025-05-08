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