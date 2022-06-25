let form = document.getElementById("login-form");
let secondPassword = document.getElementById("repeat-password-input");
console.log(secondPassword);


form.addEventListener("submit", async function(event) {
    event.preventDefault();
    let user = {};
    let username = document.getElementById("username-input").value;
    let password = document.getElementById("password-input").value;
    user["username"] = username;
    user["password"] = password;
    console.log(secondPassword);
    await checkLogin(user)
    for (const elem of document.querySelectorAll("input[type=text], input[type=password]")){
        elem.value = "";
    }
    document.getElementById("incorrect-login-details").innerHTML = "User found";
    console.log(secondPassword);
});

async function checkLogin(user){
    console.log(JSON.stringify(user));
    try {
        const response = await fetch('http://localhost:8080/users/' + user.username, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        })
        await response.json();
    } catch (e){
        console.log(e);
        console.log("smth went wrong");
    }
}
