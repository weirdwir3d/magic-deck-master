let form = document.getElementById("register-form");

form.addEventListener("submit", async function(event) {
    event.preventDefault();
    let user = {};
    let username = document.getElementById("username-input").value;
    let password = document.getElementById("password-input").value;
    let repeatPassword = document.getElementById("repeat-password-input").value;
    user["username"] = username; 
    user["password"] = password;
    console.log(JSON.stringify(user));
        // console.log(username + ", " + password + ", " + repeatPassword);
    if (await checkFields(username, password, repeatPassword)){
        if (await createUser(user) == "User with this username already exists") {
            document.getElementById("registration-result").style.color = "red";
            document.getElementById("registration-result").innerHTML = "Username already in use";
            console.log("User with this username already exists");
        } else {
            for (const elem of document.querySelectorAll("input[type=text], input[type=password]")){
                elem.value = "";
                document.getElementById("login").innerHTML = username;
                document.getElementById("registration-result").style.color = "green";
                document.getElementById("registration-result").innerHTML = "User successfully registered";
                location.href = 'welcome.html?username='+username;
        }
        // console.log(username + ", " + password + ", " + repeatPassword);
        }
      }
    else {
        console.log("smth wrong with username or password");
    }
});

async function createUser(user){
    try {
        const response = await fetch('http://localhost:8080/users', {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        await response.json();
        // console.log("Response status: ", response.status);
        let responseStatus = String(response.status);
        console.log(responseStatus);
        if (responseStatus == "409"){
            return "User with this username already exists";
        } else {
            return "User successfully created";
        }
    } catch (e){
        console.error(e);
        alert("smth went wrong");
    }
}


//FUNCTIONS

async function checkFields(username, password, repeatPassword){
    isUsernameValid = false;
    isPasswordValid = false;
    isSecondPasswordValid = false;

    let usernameRegEx = "^[A-Za-z][A-Za-z0-9_]{3,11}$";
    let passwordRegEx = "[a-z0-9_-]{5,21}";

    if (username.match(usernameRegEx)){
        console.log("valid username");
        isUsernameValid = true;
    }
    if (password.match(passwordRegEx)){
        console.log("valid password");
        isPasswordValid = true;
    }
    if (password == repeatPassword){
        isSecondPasswordValid = true;
    }

    if(!isUsernameValid){
        document.getElementById("registration-result").innerHTML = "username should be longer than 4 and shorter than 10 charaters";
        console.error("Username should be longer than 4 and shorter than 10 charaters");
        return false;
    }
    if(!isPasswordValid){
        document.getElementById("registration-result").innerHTML = "password should be longer than 6 and shorter than 20 charaters";
        console.error("Password should be longer than 6 and shorter than 20 charaters");
        return false;
    }
    if (!isSecondPasswordValid){
        document.getElementById("registration-result").innerHTML = "passwords dont match";
        console.error("Passwords don't match");
        return false;
    }
    return true;
}
