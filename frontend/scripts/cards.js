const urlParams = new URLSearchParams(window.location.search);
console.log("displaying cards for user:", urlParams.get('username'));
const table = document.getElementById("cards-display");
var username = urlParams.get('username');
document.getElementById("login").innerHTML = String(username);
let addCardBtn = document.getElementById("add-card-btn");
let cards = document.querySelectorAll(".card");
let td = document.getElementsByTagName("td");
let a = document.getElementById("filter-section");

getCards();

addCardBtn.addEventListener("click", function(event){
    event.preventDefault();
    location.href = 'addCardToUser.html?username='+username;
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

//FUNCTIONS

async function getCards() {
    try {
        const response = await fetch('http://localhost:8080/users/'+username+'/cards');
        // console.log(response);
        const responseJson = await response.json();
        console.log(responseJson);
        for (const item of responseJson){
            console.log(item);
        }
    } catch (e){
        console.error(e);
    }
}