const urlParams = new URLSearchParams(window.location.search);
var username = urlParams.get('username');
console.log("add deck for user:", username);
let login = document.getElementById("login");
login.innerHTML = String(username);
let form = document.getElementById("add-deck-form");


if (login.innerHTML == String(null)){
    login.innerHTML = "Log in";
}
form.addEventListener("submit", async function(event) {
    event.preventDefault();
    let deck = {}; 
    let name = document.getElementById("name-input").value; 
    let description = document.getElementById("description-input").value; 
    let isFavorite = document.getElementById("favorite-input").checked;
    let imagepath = document.getElementById("imagepath-input").value;
    let currentDateTime = new Date();
    deck["name"] = name;
    deck["description"] = description;
    deck["isFavorite"] = isFavorite;
    deck["imagePath"] = imagepath;
    deck["creationDate"] = currentDateTime;

    console.log(currentDateTime);

    let res = checkImagePath(imagepath);
    if (res == false) {
        document.getElementById("add-attempt-result").innerHTML = "Image link should be copied from the official Magic Card Set Symbols website";
        document.getElementById("add-attempt-result").style.color = "red";
    } else {
        await postNewFeedBack(deck);
        document.getElementById("add-attempt-result").innerHTML = "Added succesfully";
        document.getElementById("add-attempt-result").style.color = "green";

        setTimeout(function(){
            document.getElementById("imagepath-input").value = "";
            document.getElementById("name-input").value = "";
            document.getElementById("add-attempt-result").innerHTML = "";
        }, 5000);
    }
});
document.getElementById("imagepath-label").addEventListener("click", function() {
    document.getElementById("overlay").style.display = "block";

    document.getElementById("overlay").addEventListener("click", function() {
        document.getElementById("overlay").style.display = "none";
    });
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

async function postNewFeedBack(deck){
    try {
        const response = await fetch('http://localhost:8080/users/'+username+'/decks', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(deck)
        });

        const responseJson = await response.json();
    } catch (e) {
        console.error(e);
        alert("Smth went wrong");
    }
}

function checkImagePath(imagepath) {
    let pathStart = "https://cdn-cardmavin.mavin.io/wp-content/uploads/2019/";

    if (imagepath.includes(pathStart) || imagepath === "") {
        return true;
    }

    return false;
}