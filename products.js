// Cart array 
let cart = [];

// Function that will add product to cart
function addToCart(id, name, price) {
    // If product already esist in cart increase quantity
    const existingItem = cart.find(item => item.id === id);
    if (existingItem) {
        existingItem.quantity++; 
    } else {
        cart.push({ id, name, price, quantity: 1 }); // Adding new product to cart
    }
    renderCart(); // Update the cart UI
}

// Function that will remove product from cart
function removeFromCart(id) {
    // Find the item in the cart
    const itemIndex = cart.findIndex(item => item.id === id);

    if (itemIndex !== -1) {
        const item = cart[itemIndex];
        if (item.quantity > 1) {
            item.quantity--; // Decrease quantity if more than 1
        } else {
            cart.splice(itemIndex, 1); // Remove item if quantity is 1
        }
    }
    renderCart();
}

// Function to render the cart items
function renderCart() {
    const cartItemsElement = document.getElementById('cart-items');
    cartItemsElement.innerHTML = ''; // Clear previous items

    // Render each item in the cart
    cart.forEach(item => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            ${item.name} - $${item.price} (Quantity: ${item.quantity}) 
            <button class="remove-from-cart" data-id="${item.id}">Remove</button>
        `;
        cartItemsElement.appendChild(listItem);
    });

    // Event listeners for remove button
    document.querySelectorAll('.remove-from-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const id = parseInt(e.target.dataset.id);
            removeFromCart(id);
        });
    });
}

// Event listener for adding items to the cart
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (e) => {
        const id = parseInt(e.target.dataset.id);
        const name = e.target.dataset.name;
        const price = parseInt(e.target.dataset.price);
        addToCart(id, name, price);
    });
});

// Event listener for the Checkout button
document.getElementById('checkout-btn').addEventListener('click', () => {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    // Save the cart to localStorage so it can be access on the invoice page
    localStorage.setItem('cart', JSON.stringify(cart));

	// Go to invoice page
    window.location.href = "invoice.html";
});

// Load cart from localStorage
window.onload = function () {
    const savedCart = JSON.parse(localStorage.getItem('cart'));
    if (savedCart) {
        cart = savedCart;
        renderCart(); 
    }
};


// Event listener for the reservation submission
document.getElementById('reservation-form').addEventListener('submit', function(e) {
    e.preventDefault(); 

    // Getting user information
    const name = document.getElementById('name').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const service = document.getElementById('service').value;

    // Create reservation object
    const reservation = { name, date, time, service };

    // Store reservation in localStorage
    localStorage.setItem('reservation', JSON.stringify(reservation));

    // Display confirmation message
    document.getElementById('reservation-confirmation').style.display = 'block';
    document.getElementById('reservation-details').innerHTML = `
        <p>Name: ${name}</p>
        <p>Date: ${date}</p>
        <p>Time: ${time}</p>
        <p>Service: ${service}</p>
    `;
});

// Event listener for the Cancel Reservation button
document.getElementById('cancel-reservation-btn').addEventListener('click', function() {
    // Delete reservation from localStorage
    localStorage.removeItem('reservation');

    // Hiding reservation confirmation section
    document.getElementById('reservation-confirmation').style.display = 'none';

    document.getElementById('reservation-form').reset();

    alert('Your reservation has been canceled.');
});

// Loading reservation from localStorage
window.onload = function () {
    const savedReservation = JSON.parse(localStorage.getItem('reservation'));
    if (savedReservation) {
        document.getElementById('reservation-confirmation').style.display = 'block';
        document.getElementById('reservation-details').innerHTML = `
            <p>Name: ${savedReservation.name}</p>
            <p>Date: ${savedReservation.date}</p>
            <p>Time: ${savedReservation.time}</p>
            <p>Service: ${savedReservation.service}</p>
        `;
    }
};

// Event listener for the Logout button
document.getElementById('logout-btn').addEventListener('click', () => {
    // Clear all items from local storage
    localStorage.removeItem('cart');
    localStorage.removeItem('reservation'); 

    // Go to the login page
    window.location.href = "Index.html";
});

