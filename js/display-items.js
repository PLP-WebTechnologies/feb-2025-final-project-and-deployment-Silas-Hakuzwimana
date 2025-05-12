document.addEventListener("DOMContentLoaded", function () {
  const cartBadge = document.getElementById("cart-badge");
  const cartItemsContainer = document.getElementById("cart-items");
  const cartSummary = document.getElementById("cart-summary");
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p>There's no items added to your cart yet, try to add some <a href='products.html'>Add an item</a></p>";

    cartBadge.textContent = 0;
    cartSummary.innerHTML = "";
    return;
  }

  cartItemsContainer.innerHTML = "";

  let total = 0;
  let totalQuantity = 0;

  cart.forEach((item) => {
    const col = document.createElement("div");
    col.className = "col-md-4 d-flex align-items-stretch";

    col.innerHTML = `
  <div class="card h-100 text-center d-flex flex-column justify-content-center">
    <img src="${item.img}" class="card-img-top" alt="${item.title}">
    <div class="card-body">
      <h5 class="card-title">${item.title}</h5>
      <p class="card-text">Price: $${item.price}</p>
      <p class="card-text">Quantity: ${item.quantity}</p>
      <p class="fw-bold">Total: $${(item.price * item.quantity).toFixed(2)}</p>
    </div>
  </div>
`;

    total += item.price * item.quantity;
    totalQuantity += item.quantity;
    cartItemsContainer.appendChild(col);
  });

  cartSummary.innerHTML = `<h4>Cart Total: $${total.toFixed(2)}</h4>`;
  cartBadge.textContent = totalQuantity;

  document.getElementById("footerYear").textContent = new Date().getFullYear();
});
