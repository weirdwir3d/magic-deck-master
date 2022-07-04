const urlParams = new URLSearchParams(window.location.search);
var username = urlParams.get('username');
console.log("add card for user:", username);
let login = document.getElementById("login");
login.innerHTML = String(username);
let form = document.getElementById("add-deck-form");

form.addEventListener("submit", async function(event) {
    event.preventDefault();
    let deck = {};
    // let nameField = document.getElementById("name-input"); 
    let name = document.getElementById("name-input").value; 
    deck["name"] = name;
    await postNewFeedBack(deck);
    console.log(name);
    // name = "";
    console.log(name);
    document.getElementById("add-attempt-result").innerHTML = "Added succesfully";
    document.getElementById("add-attempt-result").style.color = "green";
});

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
login.addEventListener(("mouseover"), function() {
    login.innerHTML = "Log out";
    login.style.backgroundColor = "red";

    login.addEventListener(("mouseout"), function() {
        login.innerHTML = String(username);
        login.style.backgroundColor = "#383838";
    });
});


//FUNCTIONS

async function postNewFeedBack(deck){
    try {
        const response = await fetch('http://localhost:8080/users/'+username+'/decks', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(deck)
        });

        await response.json();
    } catch (e) {
        console.error(e);
        alert("Smth went wrong");
    }
}