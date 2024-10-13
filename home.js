const data= document.getElementById("menu-button");
data.addEventListener("click",function(){
    window.location.href = "menu.html";
})
document.getElementById('logout').addEventListener('click', function() {


    let userResponse = confirm(" lagout the page ?");
            if (userResponse) {
                localStorage.removeItem('username');
                localStorage.removeItem('password');
                window.location.href = 'index.html';
            } else {
                window.location.href="home.html"
            }
    // Clear the stored data and redirect to the login page
  
});