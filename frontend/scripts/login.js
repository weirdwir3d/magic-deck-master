let form = document.getElementById("login-form");


form.addEventListener("submit", async function(event) {
    event.preventDefault();
    let user = {};
    let username = document.getElementById("username-input").value;
    let password = document.getElementById("password-input").value;
    user["username"] = username;
    user["password"] = password;
    console.log(username);
    JSON.stringify(user);
    console.log(user.username);
    await checkLogin(user.username)
    username = "";
    password = "";
    document.getElementById("incorrect-login-details").innerHTML = "User found";
});

async function checkLogin(username){
    try {
        const response = await fetch('http://localhost:8080/users/' + username, {
            mode: 'no-cors',
            method: 'GET',
            cache: 'no-cache',
            headers: {
                'Content-type': 'application/json'
            }
        })
        .then((response) => {
            console.log(response.json());
            return response.json();
        });

        await response.json();
    } catch (e){
        console.error(e);
        alert("smth went wrong");
    }
}
