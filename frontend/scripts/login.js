let form = document.getElementById("login-form");


form.addEventListener("submit", async function(event) {
    event.preventDefault();
    
    let user = {};
    let username = document.getElementById("username-input").value;
    let password = document.getElementById("password-input").value;
    user["username"] = username;
    user["password"] = password;
    console.log("PASSWORD BEFORE CHECK: " + password);
    let result = await checkLogin(user);
    
    if (result == "User not found") {
        document.getElementById("incorrect-login-details").style.color = "red";
        document.getElementById("incorrect-login-details").innerHTML = "User not found";
    } else if(result == "Incorrect password for this user"){
        document.getElementById("incorrect-login-details").style.color = "red";
        document.getElementById("incorrect-login-details").innerHTML = "Incorrect password for this user";
    } else if (result == "User successfully logged in"){
        location.href = 'welcome.html?username='+user.username;
        document.getElementById("incorrect-login-details").style.color = "green";
        document.getElementById("incorrect-login-details").innerHTML = "User found";
        for (const elem of document.querySelectorAll("input[type=text], input[type=password]")){
            elem.value = "";
        }
    } else {
        document.getElementById("incorrect-login-details").style.color = "red";
        document.getElementById("incorrect-login-details").innerHTML = "Unknown error";
    }
});

async function checkLogin(user){
    console.log(JSON.stringify(user));
    console.log("USERNAME IS: " + user.username);
    console.log("PASSWORD IS: " + user.password);
    try {
        const response = await fetch('http://localhost:8080/users/' + user.username + '/' + user.password, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        })
        await response.json();
        if (String(response.status) == "404") {
            return "User not found";
        } else if (String(response.status) == "401"){
            return "Incorrect password for this user";
        } else if (String(response.status) == "200"){
            return "User successfully logged in";
        } else {
            return "Unknown error";
        }
    } catch (e){
        console.log(e);
        console.log("smth went wrong");
    }
}