let form = document.getElementById("register-form");


form.addEventListener("submit", async function(event) {
    event.preventDefault();
    let user = {};
    let username = document.getElementById("username-input").value;
    let password = document.getElementById("password-input").value;
    let repeatPassword = document.getElementById("repeat-password-input").value;
    if (checkFields(username, password, repeatPassword)){
        user["username"] = username; 
        user["password"] = password;
    await createUser(user)
    for (const elem of document.querySelectorAll("input[type=text], #password-input")){
        elem.value = "";
    }
    document.getElementById("registration-result").innerHTML = "User successfully registered";
    } else {
        console.log("smth went wrong");
    }
});

async function createUser(user){
    try {
        const response = await fetch('http://localhost:8080/users', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        await response.json();
    } catch (e){
        console.error(e);
        alert("smth went wrong");
    }
}

function checkFields(username, password, repeatPassword){
    isUsernameValid = false;
    isPasswordValid = false;
    isSecondPasswordValid = false;

    let usernameRegEx = "^[a-z0-9_-]{4,10}$";
    let passwordRegEx = "^[a-z0-9_-]{6,20}$";

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

    switch(isUsernameValid, isPasswordValid, isSecondPasswordValid) {
        case isUsernameValid = false:
            document.getElementById("registration-result").innerHTML = "username should be longer than 4 and shorter than 10 charaters";
            console.error("username should be longer than 4 and shorter than 10 charaters");
            return false;
        case isPasswordValid = false:
            document.getElementById("registration-result").innerHTML = "password should be longer than 6 and shorter than 20 charaters";
            console.error("password should be longer than 6 and shorter than 20 charaters");
            return false;
        case isSecondPasswordValid = false:
            document.getElementById("registration-result").innerHTML = "passwords dont match";
            console.error("passwords dont match");
            return false;
        default:
            return true;
    }
}