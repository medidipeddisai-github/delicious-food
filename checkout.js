// document.addEventListener("DOMContentLoaded", function() {
//     // Elements for the steps and buttons
//     const checkoutContainer = document.getElementById("checkout-container");
//     const step1 = document.getElementById('step1');
//     const step2 = document.getElementById('step2');
//     const step3 = document.getElementById('step3');
//     const thanksPage = document.getElementById('thanksPage');

//     const nextButton1 = document.getElementById('nextButton1');
//     const nextButton2 = document.getElementById('nextButton2');
//     const finishButton = document.getElementById('finishButton');

//     const cancelButton1 = document.getElementById('cancelButton1');
//     const cancelButton2 = document.getElementById('cancelButton2');
//     const cancelButton3 = document.getElementById('cancelButton3');

//     const orderDetailsContainer = document.getElementById("review-container");

//     function redirectToMenu() {
//         window.location.href = 'menu.html'; // Replace 'menu.html' with the actual URL of your menu page
//     }

//     // Set up the button to redirect to the menu page on click
//     document.getElementById('cancelButton3').onclick = redirectToMenu;

//     // Function to calculate totals
//     function calculateTotals(items) {
//         let totalQuantity = 0;
//         let totalPrice = 0;

//         items.forEach(item => {
//             totalQuantity += item.quantity;
//             totalPrice += item.price * item.quantity;
//         });

//         // Display the totals in the checkout container
//         const totalsHTML = `
//             <div class="checkout-totals">
//                 <p class='checkout-total1'><strong>Total Quantity: ${totalQuantity}</strong></p>
//                 <p class='checkout-total2'><strong>Total Price: ₹ ${totalPrice}</strong></p>
//             </div>
//         `;
//         checkoutContainer.insertAdjacentHTML('beforeend', totalsHTML);
//         orderDetailsContainer.insertAdjacentHTML('beforeend', totalsHTML);
//     }

//     // Function to create and append HTML for each item
//     function createItemHTML(item) {
//         const itemHTML = `
//             <div class="checkout-item">
//                 <img src="${item.image}" alt="${item.title}" class="checkout-item-image">
//                 <div class="checkout-item-details">
//                     <h3 class="checkout-item-title"><span>${item.title}</span></h3>
//                     <p class="checkout-item-price">Price:  <span style='margin-left:45px;'>₹ ${item.price}</span></p>
//                     <p class="checkout-item-quantity">Quantity: <span style='margin-left:25px;'>${item.quantity}</span></p>
//                     <p class="checkout-item-total">Total: <span style='margin-left:50px;'>₹ ${item.price * item.quantity}</span></p>
//                 </div>

//             </div>
//         `;
//         checkoutContainer.insertAdjacentHTML('beforeend', itemHTML);
//         orderDetailsContainer.insertAdjacentHTML('beforeend', itemHTML);
//     }

//     // Function to handle the display of steps
//     function showStep(stepToShow) {
//         const allSteps = [step1, step2, step3, thanksPage];
//         allSteps.forEach(step => {
//             if (step) {
//                 step.style.display = 'none';
//             }
//         });
//         if (stepToShow) {
//             stepToShow.style.display = 'block';
//         }
//     }

//     // Initially show the first step
//     showStep(step1);

//     // Event listeners for next buttons
//     nextButton1.addEventListener('click', function() {
//         showStep(step2);
//     });

//     nextButton2.addEventListener('click', function() {
//         const nameInput = document.getElementById('name').value;
//         const addressInput = document.getElementById('address').value;
//         const cardInput = document.getElementById('cardDetails').value;
//         if (!nameInput || !addressInput || !cardInput) {
//             displayErrorMessage('Please fill out all fields.');
//             return;
//         }

//         removeErrorMessages();

       

    

//         const checkoutItems = JSON.parse(localStorage.getItem('checkoutItems')) || [];
//         const checkoutItem = JSON.parse(localStorage.getItem('checkoutItem'));

//         if (Array.isArray(checkoutItems) && checkoutItems.length > 0) {
//             const orderDetailsHTML = checkoutItems.map(item => `
//                 <div class="order-item">
//                     <img src="${item.image}" alt="${item.name}" class="item-img">
//                     <div class="item-info">
//                         <p><strong>Name:</strong> <span>${item.name}</span></p>
//                         <p><strong>Brand:</strong> <span>${item.brand}</span></p>
//                         <p><strong>Price:</strong> <span>₹${item.price}</span></p>
//                         <p><strong>Quantity:</strong> <span>${item.count}</span></p>
//                     </div>
//                 </div>
//             `).join('');

//             orderDetailsContainer.innerHTML = `
                
//                 <div id="orderDetail">${orderDetailsHTML}</div>
//                 <div class='payInfo'>
//                     <div class="payment-info">
//                         <h5><strong>Payment Information:</strong></h5>
//                         <p><span>${cardInput}</span></p>
//                     </div>
//                     <div class="shipping-info">
//                         <h5>Shipping Information:</h5>
//                         <p>${addressInput}</p>
//                     </div>
//                 </div>
//             `;
//             calculateTotals(checkoutItems);
//         } else if (checkoutItem) {
//             orderDetailsContainer.innerHTML = `
//                 <h2 style="text-align:center">Order Details:</h2>
//                 <div class='payInfo'>
//                     <div class="payment-info">
//                         <h5>Payment Information:</h5>
//                         <p><span>${cardInput}</span></p>
//                     </div>
//                     <div class="shipping-info">
//                         <h5>Shipping Information:</h5>
//                         <p><span>${addressInput}</span></p>
//                     </div>
//                 </div>
//             `;
//             createItemHTML(checkoutItem);
//             calculateTotals([checkoutItem]);
//         }

//         showStep(step3);
//     });

//     // Function to remove all error messages
//     function removeErrorMessages() {
//         const errorMessages = document.querySelectorAll('.error-message');
//         errorMessages.forEach(function(errorMessage) {
//             errorMessage.parentNode.removeChild(errorMessage);
//         });
//     }

//     function displayErrorMessage(message) {
//         let errorContainer = document.getElementById('errorContainer');
//         // If the errorContainer doesn't exist, create it and append it to the body
//         if (!errorContainer) {
//             errorContainer = document.createElement('div');
//             errorContainer.id = 'errorContainer';
//             document.body.appendChild(errorContainer);
//         } else {
//             // If it exists, remove all existing error messages before adding a new one
//             while (errorContainer.firstChild) {
//                 errorContainer.removeChild(errorContainer.firstChild);
//             }
//         }
    
//         const errorElement = document.createElement('div');
//         errorElement.className = 'error-message';
//         errorElement.textContent = message;
//         errorElement.style.color = 'red';
//         errorContainer.appendChild(errorElement);
//     }
    

//     // Event listener for finish button
//     finishButton.addEventListener('click', function() {
//         const nameInput = document.getElementById('name').value;
//         const addressInput = document.getElementById('address').value;
//         const cardInput = document.getElementById('cardDetails').value;
//         const checkoutItem = JSON.parse(localStorage.getItem('checkoutItem'));
//         const checkoutItems = JSON.parse(localStorage.getItem('checkoutItems')) || [];
    
//         // Corrected orderDetails with conditional properties
//         const orderDetails = {
//             name: nameInput,
//             address: addressInput,
//             cardDetails: cardInput,
//             ...(checkoutItem && { items: checkoutItem }),
//             ...(checkoutItems.length > 0 && { items: checkoutItems })
//         };
    
//         const orders = JSON.parse(localStorage.getItem('orderDetails')) || [];
//         orders.push(orderDetails);
//         localStorage.setItem('orderDetails', JSON.stringify(orders));
    
//         let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    
//         // Remove the checkoutItem from cartItems
//         if (checkoutItem) {
//             const index = cartItems.findIndex(item => item.title === checkoutItem.title);
//             if (index !== -1) {
//                 cartItems.splice(index, 1);
//             }
//         }
    
//         // Remove all checkoutItems from cartItems
//         checkoutItems.forEach(item => {
//             const index = cartItems.findIndex(cartItem => cartItem.title === item.title);
//             if (index !== -1) {
//                 cartItems.splice(index, 1);
//             }
//         });
    
//         // Make sure to update the correct localStorage key
//         localStorage.setItem('cartItems', JSON.stringify(cartItems));
    
//         // Navigate to the thank you page
//         showStep(thanksPage);
//     });
    

//     // Event listeners for cancel buttons
//     cancelButton1.addEventListener('click', function() {
//         window.history.back();
//     });

//     cancelButton2.addEventListener('click', function() {
//         location.reload();
//     });

//     cancelButton3.addEventListener('click', function() {
//         location.reload();
//     });

//     // Retrieve the individual item from local storage and display it
//     const checkoutItem = JSON.parse(localStorage.getItem('checkoutItem'));
//     if (checkoutItem) {
//         createItemHTML(checkoutItem);
//         calculateTotals([checkoutItem]);
//     }

//     // Retrieve the items from local storage and display them
//     const checkoutItems = JSON.parse(localStorage.getItem('checkoutItems'));
//     if (checkoutItems && checkoutItems.length > 0) {
//         checkoutItems.forEach(createItemHTML);
//         calculateTotals(checkoutItems);
//     }
// });





document.addEventListener("DOMContentLoaded", function() {
    // Elements for the steps and buttons
    const checkoutContainer = document.getElementById("checkout-container");
    const step1 = document.getElementById('step1');
    const step2 = document.getElementById('step2');
    const step3 = document.getElementById('step3');
    const thanksPage = document.getElementById('thanksPage');

    const nextButton1 = document.getElementById('nextButton1');
    const nextButton2 = document.getElementById('nextButton2');
    const finishButton = document.getElementById('finishButton');

    const cancelButton1 = document.getElementById('cancelButton1');
    const cancelButton2 = document.getElementById('cancelButton2');
    const cancelButton3 = document.getElementById('cancelButton3');

    const orderDetailsContainer = document.getElementById("review-container");

    function redirectToMenu() {
        window.location.href = 'menu.html'; // Replace 'menu.html' with the actual URL of your menu page
    }

    // Set up the button to redirect to the menu page on click
    document.getElementById('cancelButton3').onclick = redirectToMenu;

    // Function to calculate totals
    function calculateTotals(items) {
        let totalQuantity = 0;
        let totalPrice = 0;

        items.forEach(item => {
            totalQuantity += item.quantity;
            totalPrice += item.price * item.quantity;
        });

        // Display the totals in the checkout container
        const totalsHTML = `
            <div class="checkout-totals">
                <p class='checkout-total1'><strong>Total Quantity: ${totalQuantity}</strong></p>
                <p class='checkout-total2'><strong>Total Price: ₹ ${totalPrice}</strong></p>
            </div>
        `;
        checkoutContainer.insertAdjacentHTML('beforeend', totalsHTML);
        orderDetailsContainer.insertAdjacentHTML('beforeend', totalsHTML);
    }

    // Function to create and append HTML for each item
    function createItemHTML(item) {
        const itemHTML = `
            <div class="checkout-item">
                <img src="${item.image}" alt="${item.title}" class="checkout-item-image">
                <div class="checkout-item-details">
                    <h3 class="checkout-item-title"><span>${item.title}</span></h3>
                    <p class="checkout-item-price">Price:  <span style='margin-left:45px;'>₹ ${item.price}</span></p>
                    <p class="checkout-item-quantity">Quantity: <span style='margin-left:25px;'>${item.quantity}</span></p>
                    <p class="checkout-item-total">Total: <span style='margin-left:50px;'>₹ ${item.price * item.quantity}</span></p>
                </div>

            </div>
        `;
        checkoutContainer.insertAdjacentHTML('beforeend', itemHTML);
        orderDetailsContainer.insertAdjacentHTML('beforeend', itemHTML);
    }

    // Function to handle the display of steps
    function showStep(stepToShow) {
        const allSteps = [step1, step2, step3, thanksPage];
        allSteps.forEach(step => {
            if (step) {
                step.style.display = 'none';
            }
        });
        if (stepToShow) {
            stepToShow.style.display = 'block';
        }
    }

    // Initially show the first step
    showStep(step1);

    // Event listeners for next buttons
    nextButton1.addEventListener('click', function() {
        showStep(step2);
    });

    nextButton2.addEventListener('click', function() {
        const nameInput = document.getElementById('name').value;
        const addressInput = document.getElementById('address').value;
        const cardInput = document.getElementById('cardDetails').value;
        if (!nameInput || !addressInput || !cardInput) {
            displayErrorMessage('Please fill out all fields.');
            return;
        }

        removeErrorMessages();        

        const checkoutItems = JSON.parse(localStorage.getItem('checkoutItems')) || [];
        const checkoutItem = JSON.parse(localStorage.getItem('checkoutItem'));

        if (Array.isArray(checkoutItems) && checkoutItems.length > 0) {
            const orderDetailsHTML = checkoutItems.map(item => `
                <div class="order-item">
                    <img src="${item.image}" alt="${item.tite}" class="item-img">
                    <div class="item-info">
                        <p><strong>Name:</strong> <span>${item.title}</span></p>
                       
                        <p><strong>Price:</strong> <span>₹${item.price}</span></p>
                        <p><strong>Quantity:</strong> <span>${item.quantity}</span></p>
                    </div>
                </div>
            `).join('');

            orderDetailsContainer.innerHTML = `
                
                <div id="orderDetail">${orderDetailsHTML}</div>
                <div class='payInfo'>
                    <div class="payment-info">
                        <h5><strong>Payment Information:</strong></h5>
                        <p><span>${cardInput}</span></p>
                    </div>
                    <div class="shipping-info">
                        <h5>Shipping Information:</h5>
                        <p>${addressInput}</p>
                    </div>
                </div>
            `;
            calculateTotals(checkoutItems);
        } else if (checkoutItem) {
            orderDetailsContainer.innerHTML = `
              <h2 style="text-align:center">Order Details:</h2>
            <div class="checkout-item">
                <img src="${checkoutItem.image}" alt="${checkoutItem.title}" class="checkout-item-image">
                <div class="checkout-item-details">
                    <h3 class="checkout-item-title"><span>${checkoutItem.title}</span></h3>
                    <p class="checkout-item-price">Price:  <span style='margin-left:45px;'>₹ ${checkoutItem.price}</span></p>
                    <p class="checkout-item-quantity">Quantity: <span style='margin-left:25px;'>${checkoutItem.quantity}</span></p>
                    <p class="checkout-item-total">Total: <span style='margin-left:50px;'>₹ ${checkoutItem.price * checkoutItem.quantity}</span></p>
                </div>

            </div>          
            <div class='payInfo'>
                <div class="payment-info">
                    <h5>Payment Information:</h5>
                    <p><span>${cardInput}</span></p>
                </div>
                <div class="shipping-info">
                    <h5>Shipping Information:</h5>
                    <p><span>${addressInput}</span></p>
                </div>
            </div>
           `;
           
            calculateTotals([checkoutItem]);
           
           
        }

        showStep(step3);
    });

    // Function to remove all error messages
    function removeErrorMessages() {
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(function(errorMessage) {
            errorMessage.parentNode.removeChild(errorMessage);
        });
    }

    function displayErrorMessage(message) {
        let errorContainer = document.getElementById('errorContainer');
        // If the errorContainer doesn't exist, create it and append it to the body
        if (!errorContainer) {
            errorContainer = document.createElement('div');
            errorContainer.id = 'errorContainer';
            document.body.appendChild(errorContainer);
        } else {
            // If it exists, remove all existing error messages before adding a new one
            while (errorContainer.firstChild) {
                errorContainer.removeChild(errorContainer.firstChild);
            }
        }
    
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        errorElement.style.color = 'red';
        errorContainer.appendChild(errorElement);
    }
    

    // Event listener for finish button
    finishButton.addEventListener('click', function() {
        const nameInput = document.getElementById('name').value;
        const addressInput = document.getElementById('address').value;
        const cardInput = document.getElementById('cardDetails').value;
        const checkoutItem = JSON.parse(localStorage.getItem('checkoutItem'));
        const checkoutItems = JSON.parse(localStorage.getItem('checkoutItems')) || [];
    
        // Corrected orderDetails with conditional properties
        const orderDetails = {
            name: nameInput,
            address: addressInput,
            cardDetails: cardInput,
            ...(checkoutItem && { items: checkoutItem }),
            ...(checkoutItems.length > 0 && { items: checkoutItems })
        };
    
        const orders = JSON.parse(localStorage.getItem('orderDetails')) || [];
        orders.push(orderDetails);
        localStorage.setItem('orderDetails', JSON.stringify(orders));
    
        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    
        // Remove the checkoutItem from cartItems
        if (checkoutItem) {
            const index = cartItems.findIndex(item => item.title === checkoutItem.title);
            if (index !== -1) {
                cartItems.splice(index, 1);
            }
        }
    
        // Remove all checkoutItems from cartItems
        checkoutItems.forEach(item => {
            const index = cartItems.findIndex(cartItem => cartItem.title === item.title);
            if (index !== -1) {
                cartItems.splice(index, 1);
            }
        });
    
        // Make sure to update the correct localStorage key
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    
        // Navigate to the thank you page
        showStep(thanksPage);
    });
    

    // Event listeners for cancel buttons
    cancelButton1.addEventListener('click', function() {
        window.history.back();
    });

    cancelButton2.addEventListener('click', function() {
        location.reload();
    });

    cancelButton3.addEventListener('click', function() {
        location.reload();
    });

    // Retrieve the individual item from local storage and display it
    const checkoutItem = JSON.parse(localStorage.getItem('checkoutItem'));
    if (checkoutItem) {
        createItemHTML(checkoutItem);
        calculateTotals([checkoutItem]);
    }

    // Retrieve the items from local storage and display them
    const checkoutItems = JSON.parse(localStorage.getItem('checkoutItems'));
    if (checkoutItems && checkoutItems.length > 0) {
        checkoutItems.forEach(createItemHTML);
        calculateTotals(checkoutItems);
    }
});


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