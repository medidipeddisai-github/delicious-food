document.getElementById('show-signup').addEventListener('click', function() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('signup-form').style.display = 'block';
});

document.getElementById('show-login').addEventListener('click', function() {
    document.getElementById('login-form').style.display = 'block';
    document.getElementById('signup-form').style.display = 'none';
});

document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('signup-username').value;
    const email=document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const userData = { email: email, password: password };
    localStorage.setItem(username, JSON.stringify(userData));
    alert('Account created successfully!');
    document.getElementById('signup-form').reset();
    document.getElementById('show-login').click();
});

// document.getElementById('login-form').addEventListener('submit', function(event) {
//     event.preventDefault();
//     const username = document.getElementById('login-username').value;
//     const password = document.getElementById('login-password').value;
//     if (localStorage.getItem(username) === password) {
//         alert('Login successful!');
//         // Redirect to the home page or any other page
//         window.location.href = '/homepage/home.html';

//     } else {
//         alert('Invalid username or password');
document.getElementById('login-form').addEventListener('submit', function(event) {
            event.preventDefault();
            const username = document.getElementById('login-username').value;
            const password = document.getElementById('login-password').value;
        
            // Retrieve user data
            const userData = JSON.parse(localStorage.getItem(username));
            if (userData && userData.password === password) {
                alert('Login successful!');
                // Redirect to the home page or any other page
                window.location.href = 'home.html';
            } else {
                alert('Invalid username or password');
            }
  });
    

