const urlParams = new URLSearchParams(window.location.search);
console.log("displaying message for user:", urlParams.get('username'));
var username = urlParams.get('username');
const message = document.getElementById("welcome-message");


getUser();

document.getElementById("cards").addEventListener("click", async function(event) {
    event.preventDefault();

    location.href = 'cards.html?username='+username;
    try {
        const response = await fetch('http://localhost:8080/users/'+username+'/cards', {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-type': 'application/json'
            },
        })
        await response.json();
    } catch (e){
        console.error(e);
        alert("smth went wrong");
    }
});
document.getElementById("decks").addEventListener("click", async function(event) {
    event.preventDefault();

    location.href = 'decks.html?username='+username;
    try {
        const response = await fetch('http://localhost:8080/users/'+username+'/decks', {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-type': 'application/json'
            },
        })
        await response.json();
    } catch (e){
        console.error(e);
        alert("smth went wrong");
    }
});
document.getElementById("about").addEventListener("click", function(event) {
    event.preventDefault();
    location.href = 'about.html?username='+username;
});


//FUNCTIONS

async function getUser() {
    try {
        const response = await fetch('http://localhost:8080/users/'+username);
        const responseJson = await response.json();
        // console.log(responseJson);
    message.innerHTML = urlParams.get('username') + " successfully logged in!";
    document.getElementById("login").innerHTML = String(username);
    } catch (e){
        console.error(e);
    }
}

