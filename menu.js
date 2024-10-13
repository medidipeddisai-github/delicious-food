document.addEventListener("DOMContentLoaded", function() {
    const productContainer = document.querySelector(".productContainer");
    const view = "/menupage/data.json";
    const searchInput = document.getElementById("searchInput");

    // Initialize cart from local storage
    let cart = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Function to render product data
    function renderProducts(products) {
        productContainer.innerHTML = ''; // Clear existing products

        products.forEach(item => {
            const productCard = document.createElement("div");
            productCard.classList.add("productCard");

            const productTitle = document.createElement("p");
            productTitle.classList.add("productTitle");
            productTitle.textContent = item.title;

            const productImage = document.createElement("img");
            productImage.classList.add("productImage");
            productImage.setAttribute("src", item.image);

            const productDescription = document.createElement("p");
            productDescription.classList.add("productDescription");
            productDescription.textContent = item.description;

            const productPrice = document.createElement("p");
            productPrice.classList.add("productPrice");
            productPrice.textContent = "PRICE: $" + item.price;

            const addToCart = document.createElement("button");
            addToCart.classList.add("addToCart");
            addToCart.textContent = "Add to cart";

            productCard.appendChild(productTitle);
            productCard.appendChild(productImage);
            productCard.appendChild(productDescription);
            productCard.appendChild(productPrice);
            productCard.appendChild(addToCart);
            productContainer.appendChild(productCard);

            // Add event listener to addToCart button
            addToCart.addEventListener('click', () => {
                console.log(`Adding to cart: ${item.title}`);
                addToCartHandler(item);
            });
        });
    }

    // Fetch and display all products on initial load
    fetch('https://api.jsonbin.io/v3/b/666438f6ad19ca34f8760258', {
        method: 'GET',
        headers: {
            'X-Master-Key': '$2b$10$.5RTawEVLeUxNlnmNipR3O5vkgh8J2KCXlCqLy1V4ItqH4KlOF0Hq',
            'X-Access-Key': '666439abad19ca34f8760286',
        },
    })
    .then(res => res.json())
    .then(productData => {
        if(Array.isArray(productData.record)) {
            renderProducts(productData.record);

        // Search functionality
        if (searchInput) {
            searchInput.addEventListener("input", function() {
                const searchText = searchInput.value.trim().toLowerCase();
                console.log(`Search text: ${searchText}`); // Log the search text

                if (searchText === '') {
                    console.log('Search text is empty, displaying all products');
                    renderProducts(productData.record); // Display all products if search text is empty
                } else {
                    const filteredProducts = productData.record.filter(item => item.title.toLowerCase().includes(searchText));
                    console.log('Filtered products:', filteredProducts); // Log the filtered products
                    renderProducts(filteredProducts);
                }
            });
        }
        }
        else {
        console.error('Fetched data is not an array:',product.record);
    }
    })
    .catch(error => {
        console.error('Error fetching products:', error);
    });

    // Add to cart functionality
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
            listItem.textContent =`${item.title} - $${item.price} x ${item.quantity}`;
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

    // function updateCartCount() {
    //     const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
    //     const spanIdElement = document.getElementById('span_id');
    //     if (spanIdElement) {
    //         spanIdElement.textContent = cartCount;
    //     } else {
    //         console.error('#span_id element not found');
    //     }
    // }

    // Back button functionality
    const back = document.getElementById("nav-btn");
    if (back) {
        back.addEventListener("click", function() {
            window.location.href = "home.html";
        });
    }
    function updateCartCount() {
        const cartCount = cart.reduce((acc, item) => acc + (item.quantity > 0 ? 1 : 0), 0);
        document.getElementById('span_id').textContent = cartCount;
    }
});

// document.addEventListener("DOMContentLoaded", function() {
//     const productContainer = document.querySelector(".productContainer");
//     const view = "/menupage/data.json";
//     const searchInput = document.getElementById("searchInput");

//     // Initialize cart from local storage
//     let cart = JSON.parse(localStorage.getItem('cartItems')) || [];

//     // Function to render product data
//     function renderProducts(products) {
//         productContainer.innerHTML = ''; // Clear existing products

//         products.forEach(item => {
//             const productCard = document.createElement("div");
//             productCard.classList.add("productCard");

//             const productTitle = document.createElement("p");
//             productTitle.classList.add("productTitle");
//             productTitle.textContent = item.title;

//             const productImage = document.createElement("img");
//             productImage.classList.add("productImage");
//             productImage.setAttribute("src", item.image);

//             const productDescription = document.createElement("p");
//             productDescription.classList.add("productDescription");
//             productDescription.textContent = item.description;

//             const productPrice = document.createElement("p");
//             productPrice.classList.add("productPrice");
//             productPrice.textContent = "PRICE: $" + item.price;

//             const addToCart = document.createElement("button");
//             addToCart.classList.add("addToCart");
//             addToCart.textContent = "Add to cart";

//             productCard.appendChild(productTitle);
//             productCard.appendChild(productImage);
//             productCard.appendChild(productDescription);
//             productCard.appendChild(productPrice);
//             productCard.appendChild(addToCart);
//             productContainer.appendChild(productCard);

//             // Add event listener to addToCart button
//             addToCart.addEventListener('click', () => {
//                 console.log(`Adding to cart: ${item.title}`);
//                 addToCartHandler(item);
//             });
//         });
//     }

//     // Fetch and display all products on initial load
//     fetch(view)
//     .then(res => res.json())
//     .then(productData => {
//         renderProducts(productData);

//         // Search functionality
//         if (searchInput) {
//             searchInput.addEventListener("input", function() {
//                 const searchText = searchInput.value.trim().toLowerCase();
//                 console.log(`Search text: ${searchText}`); // Log the search text

//                 if (searchText === '') {
//                     console.log('Search text is empty, displaying all products');
//                     renderProducts(productData); // Display all products if search text is empty
//                 } else {
//                     const filteredProducts = productData.filter(item => item.title.toLowerCase().includes(searchText));
//                     console.log('Filtered products:', filteredProducts); // Log the filtered products
//                     renderProducts(filteredProducts);
//                 }
//             });
//         }
//     })
//     .catch(error => {
//         console.error('Error fetching products:', error);
//     });

//     // Add to cart functionality
//     function addToCartHandler(product) {
//         const existingProduct = cart.find(item => item.id === product.id);

//         if (existingProduct) {
//             existingProduct.quantity += 1;
//         } else {
//             cart.push({ ...product, quantity: 1 });
//         }

//         saveCartToLocalStorage();
//         updateCartDisplay();
//         updateCartCount(); // Update cart count after adding to cart
//     }

//     function updateCartDisplay() {
//         const cartContainer = document.getElementById("cart-items");
//         if (!cartContainer) {
//             console.error('Cart container element not found');
//             return;
//         }
//         cartContainer.innerHTML = ''; // Clear current items

//         cart.forEach(item => {
//             const listItem = document.createElement('li');
//             listItem.textContent = `${item.title} - $${item.price} x ${item.quantity}`;
//             cartContainer.appendChild(listItem);
//         });
//     }

//     function saveCartToLocalStorage() {
//         localStorage.setItem('cartItems', JSON.stringify(cart));
//     }

//     // Load cart items from local storage on page load
//     function loadCartFromLocalStorage() {
//         const storedCart = JSON.parse(localStorage.getItem('cartItems'));
//         if (storedCart) {
//             cart = storedCart;
//         }
//         updateCartDisplay();
//         updateCartCount(); // Update cart count on page load
//     }

//     // Load cart items when the page loads
//     loadCartFromLocalStorage();

//     function updateCartCount() {
//         const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
//         const spanIdElement = document.getElementById('span_id');
//         if (spanIdElement) {
//             spanIdElement.textContent = cartCount;
//         } else {
//             console.error('#span_id element not found');
//         }
//     }

//     // Back button functionality
//     const back = document.getElementById("nav-btn");
//     if (back) {
//         back.addEventListener("click", function() {
//             window.location.href = "/homepage/home.html";
//         });
//     }
//     function updateCartCount() {
//         const cartCount = cart.reduce((acc, item) => acc + (item.quantity > 0 ? 1 : 0), 0);
//         document.getElementById('span_id').textContent = cartCount;
//     }
// });
