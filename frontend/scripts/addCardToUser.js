const urlParams = new URLSearchParams(window.location.search);
var username = urlParams.get('username');
let login = document.getElementById("login");
login.innerHTML = String(username);
let form = document.getElementById("add-card-form");


if (login.innerHTML == String(null)){
    login.innerHTML = "Log in";
}
form.addEventListener("submit", async function(event) {
    event.preventDefault();
    let card = {};
    let cardname = document.getElementById("name-input").value;
    let type = document.getElementById("type-input").value;
    let color1 = document.getElementById("color1-input").value;
    let color2 = document.getElementById("color2-input").value;
    let power = document.getElementById("power-input").value;
    let toughness = document.getElementById("toughness-input").value;
    let manacost1 = document.getElementById("manacost1-input").value;
    let manacost2 = document.getElementById("manacost2-input").value;
    let ability1 = document.getElementById("ability1-input").value;
    let ability2 = document.getElementById("ability2-input").value;
    let description = document.getElementById("description-input").value;
    let imagepath = document.getElementById("imagepath-input").value;
    card["name"] = cardname;
    card["type"] = type;
    card["color1"] = color1;
    card["color2"] = color2;
    card["power"] = power;
    card["toughness"] = toughness;
    card["manaCost1"] = manacost1;
    card["manaCost2"] = manacost2;
    card["ability1"] = ability1;
    card["ability2"] = ability2;
    card["description"] = description;
    card["imagePath"] = imagepath;
    let res = checkImagePath(imagepath);
    if (res == false){
        document.getElementById("add-attempt-result").innerHTML = "Image link should be copied from the official Gatherer website";
        document.getElementById("add-attempt-result").style.color = "red";
    } else {
        await postNewFeedBack(card);

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

async function postNewFeedBack(card){
    try {
        const response = await fetch('http://localhost:8080/users/'+username+'/cards', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(card)
        });
        console.log(JSON.stringify(card))

        const responseJson = await response.json();
        console.log(responseJson.name);
        console.log("Image path is " + responseJson.imagepath);
        console.log(responseJson);
    } catch (e) {
        console.error(e);
        alert("Smth went wrong");
    }
}

function checkImagePath(imagepath) {
    let pathStart = "https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=";

    // if (imagepath.includes(pathStart) || imagepath === "") {
    //     return true;
    // }

    // return false;
    return true;
}

// function checkLimitCheckedBoxes(){
//     for (const elem of document.querySelectorAll("input[type=checkbox]")){
//         elem.addEventListener("change", function (event){
//             if (this.siblings(':checked').len)
//         })
//     }
// }