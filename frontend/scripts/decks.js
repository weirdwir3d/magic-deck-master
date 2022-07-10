const urlParams = new URLSearchParams(window.location.search);
var username = urlParams.get('username');
console.log("displaying decks for user:", username);
const table = document.getElementById("decks-display");
let login = document.getElementById("login");
login.innerHTML = String(username);
let addDeckBtn = document.getElementById("add-deck-btn");
let allDecks = document.querySelectorAll(".decks");
allDecks = Array.from(allDecks);

getDecks();

if (login.innerHTML == String(null)){
    login.innerHTML = "Log in";
}
addDeckBtn.addEventListener("click", function(event){
    event.preventDefault();
    location.href = 'addDeckToUser.html?username='+username;
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

async function getDecks() {
    try {
        const response = await fetch('http://localhost:8080/users/'+username+'/decks', {
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
            const deckname = document.createElement("p");
            const image = document.createElement("img"); 
            image.setAttribute('src', item.imagePath);
            image.setAttribute('max-width', "100%");
            image.setAttribute('max-height', "100%");
            image.setAttribute('display', "block");
            div.setAttribute("class", "decks");
            div.setAttribute("id", String(item.id));
            deckname.innerHTML = String(item.name);

            tr.append(td);
            td.appendChild(div);
            div.appendChild(image);
            div.appendChild(deckname);
            table.appendChild(tr);

            counter++;
            allDecks.push(div);
        }

        allDecks.forEach(deck => {
            deck.addEventListener("click", async function() {
                document.getElementById("infobox-message").style.display = "none";
                document.getElementById("deckinfo-grid").style.display = "grid";

                await fetchDeckDetails(deck.id);

                //USER WANTS TO ADD DECK TO FAVORITES
                document.getElementById("add-to-favourites").addEventListener("click", function() {
                    if (document.getElementById("add-to-favourites").innerHTML == "Add to favorites"){
                        //
                    }
                })
            });
        });

    } catch (e){
        console.error(e);
    }
}

async function fetchDeckDetails(deckID) {
    try {
        const response = await fetch('http://localhost:8080/users/'+username+'/decks/'+deckID, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            },
        })
        const responseJson = await response.json();

        document.getElementById("deckname").innerHTML = String(responseJson.name);
        document.getElementById("description").innerHTML = String(responseJson.description);
        document.getElementById("nrcards").innerHTML = String(responseJson.nrOfCards);
        document.getElementById("nrspells").innerHTML = String(responseJson.nrOfSpells);
        document.getElementById("nrpermanents").innerHTML = String(responseJson.nrOfPermanents);
        document.getElementById("lastedited").innerHTML = String(responseJson.lastEdited);
        document.getElementById("creationdate").innerHTML = String(responseJson.creationDate);
        if (responseJson.hasPlanesWalker == true) {
            document.getElementById("planeswalker").style.color = "blue";
        }
        if (responseJson.isFavorite == true) {
            document.getElementById("favorite").style.color = "gold";
            document.getElementById("add-to-favourites").innerHTML = "Remove from favorites";
        } else {
            document.getElementById("add-to-favourites").innerHTML = "Add to favorites";
        }

    } catch (e){
        console.error(e);
        alert("smth went wrong");
    }
}