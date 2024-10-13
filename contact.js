document.getElementById('logout').addEventListener('click', function() {


    let userResponse = confirm(" lagout the page ?");
            if (userResponse) {
                localStorage.removeItem('username');
                localStorage.removeItem('password');
                window.location.href = 'index.html';
            }
            //  else {
            //     window.location.href="/contact/contact.html";
            // }
    // Clear the stored data and redirect to the login page
  
});