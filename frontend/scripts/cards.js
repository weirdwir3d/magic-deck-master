const urlParams = new URLSearchParams(window.location.search);
var username = urlParams.get('username');
console.log("displaying cards for user:", username);
const table = document.getElementById("cards-display");
let login = document.getElementById("login");
login.innerHTML = String(username);
let addCardBtn = document.getElementById("add-card-btn");
let cards = document.querySelectorAll(".card");
let td = document.getElementsByTagName("td");
let a = document.getElementById("filter-section");
let allCards = document.querySelectorAll(".cards");
allCards = Array.from(allCards);

getCards();


if (login.innerHTML == String(null)){
    login.innerHTML = "Log in";
}
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
login.addEventListener(("mouseover"), function() {
    if (login.innerHTML == String("Log in")) {
        login.style.backgroundColor = "orange";
    } else {
        login.innerHTML = "Log out";
    login.style.backgroundColor = "red";
    }

    login.addEventListener(("mouseout"), function() {
        login.innerHTML = String(username);
        login.style.backgroundColor = "#383838";
        if (login.innerHTML == String(null)){
            login.innerHTML = "Log in";
        }
    });
});

//FUNCTIONS

async function getCards() {
    try {
        const response = await fetch('http://localhost:8080/users/'+username+'/cards', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            },
        })
        const responseJson = await response.json();
        // console.log(responseJson);
        var counter = 0;
        let tr;
        for (const item of responseJson){
            if (counter % 4 == 0){
                tr = document.createElement("tr");
            } 
            if (counter == 0){
                tr = document.getElementById("first-row");
            }
            
            const td = document.createElement("td");
            const div = document.createElement("div");
            const cardname = document.createElement("p");
            const image = document.createElement("img"); 
            image.setAttribute('src', item.imagePath);
            image.setAttribute('max-width', "100%");
            image.setAttribute('max-height', "100%");
            image.setAttribute('display', "block");
            div.setAttribute("class", "cards");
            div.setAttribute("id", String(item.id));
            cardname.innerHTML = String(item.name);

            tr.append(td);
            td.appendChild(div);
            div.appendChild(image);
            div.appendChild(cardname);
            table.appendChild(tr);
            
            counter++;
            allCards.push(div);
        }

        allCards.forEach(card => {
            card.addEventListener("click", async function() {
                document.getElementById("infobox-message").style.display = "none";
                document.getElementById("cardinfo-grid").style.display = "grid";
                // console.log(card);
                await fetchCardDetails(card.id);
                // document.getElementById("cardname").innerHTML = String(card.id);
            })
        })
    } catch (e){
        console.error(e);
    }
}

async function fetchCardDetails(cardID) {
    try {
        const response = await fetch('http://localhost:8080/users/'+username+'/cards/'+cardID, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            },
        })
        const responseJson = await response.json();

        document.getElementById("cardname").innerHTML = String(responseJson.name);
        document.getElementById("cardtype").innerHTML = String(responseJson.type);
        document.getElementById("color1").innerHTML = String(responseJson.color1);
        document.getElementById("color2").innerHTML = String(responseJson.color2);
        document.getElementById("powerandtoughness").innerHTML = String(responseJson.power) + "/" + String(responseJson.toughness);
        document.getElementById("manacost").innerHTML = String(responseJson.manaCost1);
        document.getElementById("ability1").innerHTML = String(responseJson.ability1);
        document.getElementById("ability2").innerHTML = String(responseJson.ability2);
        document.getElementById("description").innerHTML = String(responseJson.description);

    } catch (e){
        console.error(e);
        alert("smth went wrong");
    }
}