const urlParams = new URLSearchParams(window.location.search);
console.log("displaying cards for user: ", urlParams.get('username'));
const table = document.getElementById("cards-display");

async function getCards() {
    try {
        const response = await fetch('http://localhost:8080/users/'+urlParams.get('username')+'/cards');
        console.log(response);
        const responseJson = await response.json();
        console.log(responseJson);
        for (const item of responseJson){
            console.log(item);
        }
    } catch (e){
        console.error(e);
    }
}

getCards();
let addCardBtn = document.getElementById("add-card-btn");
let cards = document.querySelectorAll(".card");
let td = document.getElementsByTagName("td");
let a = document.getElementById("filter-section");
console.log(cards);
console.log(table[0]);


addCardBtn.addEventListener("click", function(){
    
})