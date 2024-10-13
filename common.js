  // Add to cart functionality
  function updateCartCount() {
    const cartCount = cart.reduce((acc, item) => acc + (item.quantity > 0 ? 1 : 0), 0);
    document.getElementById('span_id').textContent = cartCount;
}
  function addToCartHandler(product) {
    const existingProduct = cart.find(item => item.id === product.id);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    saveCartToLocalStorage();
    updateCartDisplay();
    updateCartCount(); // Update cart count after adding to cart
}

function updateCartDisplay() {
    const cartContainer = document.getElementById("cart-items");
    if (!cartContainer) {
        console.error('Cart container element not found');
        return;
    }
    cartContainer.innerHTML = ''; // Clear current items

    cart.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.title} - $${item.price} x ${item.quantity}`;
        cartContainer.appendChild(listItem);
    });
}

function saveCartToLocalStorage() {
    localStorage.setItem('cartItems', JSON.stringify(cart));
}

// Load cart items from local storage on page load
function loadCartFromLocalStorage() {
    const storedCart = JSON.parse(localStorage.getItem('cartItems'));
    if (storedCart) {
        cart = storedCart;
    }
    updateCartDisplay();
    updateCartCount(); // Update cart count on page load
}

// Load cart items when the page loads
loadCartFromLocalStorage();



// Back button functionality
const back = document.getElementById("nav-btn");
if (back) {
    back.addEventListener("click", function() {
        window.location.href = "home.html";
    });
}


