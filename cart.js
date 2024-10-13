document.addEventListener("DOMContentLoaded", function() {
    function loadCartFromLocalStorage() {
        const cartContainer = document.getElementById("cart-items");
        const totalAmount = document.getElementById("totalAmount");
        let finalPrice = 0;
        let cart = JSON.parse(localStorage.getItem('cartItems')) || [];

        // Clear cart container before updating
        cartContainer.innerHTML = "";

        if (cart.length === 0) {
            cartContainer.innerHTML = "<div class='empty-message'>Your cart is empty.</div>";
        } else {
            // Ensure all items have the 'count' property initialized
            cart = cart.map(item => {
                if (!item.count) {
                    item.count = 1;
                }
                return item;
            });

            // Update cart display
            cart.forEach((item, index) => {
                const itemContainer = document.createElement('div');
                itemContainer.className = "cart-item";

                itemContainer.innerHTML = `
                   <div class='cartItemContainer'>
                    <div class="item-image">
                        <img src="${item.image}" alt="${item.title}" >
                    </div>
                    <div class="item-details">
                        <div class="item-name">${item.title}</div>
                        <div class="item-price">Price :₹ ${item.price}</div>
                        <div class='quantityControl'>
                            <button onclick="decrementItem(${index})" class="decrement-btn">-</button>
                            <p class="item-quantity">${item.count}</p>
                            <button onclick="incrementItem(${index})" class="increment-btn">+</button>
                        </div>
                        <div class="item-total">Total: ₹ ${item.price * item.count}</div>
                        <button class='delete-btn' onclick="deleteItem(${index})">Delete</button>
                    </div>
                    </div>
                `;

                cartContainer.appendChild(itemContainer);
                finalPrice += item.price * item.count;
            });
        }

        totalAmount.innerHTML = `
        <div style='display:flex;flex-direction:column'>
            <p class="total-amount">Total: ₹ ${finalPrice}</p>
            <div>
             <button class="clear-all-btn">Clear All</button>
            <button id="checkout-all-btn">Checkout All</button>
            </div>
         <div>  
        `;

        totalAmount.querySelector('.clear-all-btn').addEventListener('click', () => {
            if (confirm('Are you sure you want to clear all items?')) {
                clearCart(); // Clear all items from the cart
            }
        });
    }

    window.deleteItem = function(index) {
        let cart = JSON.parse(localStorage.getItem('cartItems')) || [];
        cart.splice(index, 1);
        localStorage.setItem('cartItems', JSON.stringify(cart));
        loadCartFromLocalStorage(); // Update the cart display without refreshing the page
    };

    function clearCart() {
        localStorage.removeItem('cartItems');
        loadCartFromLocalStorage(); // Update the cart display without refreshing the page
    }

    window.incrementItem = function(index) {
        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        cartItems[index].count++;
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        loadCartFromLocalStorage();
    };

    window.decrementItem = function(index) {
        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        if (cartItems[index].count > 1) { // Ensure the count doesn't go below 1
            cartItems[index].count--;
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            loadCartFromLocalStorage();
        }
    };

    loadCartFromLocalStorage();

    const backBtn = document.getElementById("back-btn");
    if (backBtn) {
        backBtn.addEventListener("click", function() {
            window.location.href = "menu.html";
        });
    }
    // Function to handle ordering an individual item

// Event listener for the "Checkout All" button
const checkoutAllBtn = document.getElementById("checkout-all-btn");
if (checkoutAllBtn) {
    checkoutAllBtn.addEventListener("click", function() {
        // Clear the 'checkoutItem' from local storage to avoid showing the individual order
        localStorage.removeItem('checkoutItem');

        // Retrieve the cart items from local storage or set to an empty array if none exist
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        // Store the cart items in local storage under 'checkoutItems' for the checkout page
        localStorage.setItem('checkoutItems', JSON.stringify(cartItems));
        // Redirect to the checkout page
        window.location.href = "checkout.html"; // Adjust the path as needed
    });
}
});
function placeToOrder(button) {
    // Clear the 'checkoutItems' from local storage to avoid showing all orders
    localStorage.removeItem('checkoutItems');

    // Retrieve the product data stored in the button's 'data-product' attribute
    const productData = JSON.parse(button.getAttribute('data-product'));
    // Store the individual product data in local storage under 'checkoutItem' for the checkout page
    localStorage.setItem('checkoutItem', JSON.stringify(productData));
    // Redirect to the checkout page
    window.location.href = "checkout.html";
}
// logout process
document.getElementById('logout').addEventListener('click', function() {


    let userResponse = confirm(" lagout the page ?");
            if (userResponse) {
                localStorage.removeItem('username');
                localStorage.removeItem('password');
                window.location.href = 'index.html';
            } 
            // else {
            //     window.location.href="/aboutpage/about.html"
            // }
    // Clear the stored data and redirect to the login page
  
});
