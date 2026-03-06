document.getElementById("sign-in-btn").addEventListener("click", function(){
    const inputUserName = document.getElementById("username-input");
    const username = inputUserName.value ;
    const inputPassword = document.getElementById("password-input");
    const password = inputPassword.value ;
    if(username==="admin"& password==="admin123"){
        alert("Login Successful");

        window.location.assign("./home.html");
    }
    else{
        alert("Login Faild.Try Again Later.")
        return ;
    }
    
})