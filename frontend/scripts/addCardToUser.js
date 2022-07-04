const urlParams = new URLSearchParams(window.location.search);
console.log("add card for user:", urlParams.get('username'));
var username = urlParams.get('username');
document.getElementById("login").innerHTML = String(username);
let form = document.getElementById("add-card-form");

form.addEventListener("submit", async function(event) {
    event.preventDefault();
    let card = {};
    // let name = document.getElementById
    for (const elem of document.querySelectorAll("input[type=text]")){
        card[elem.name] = elem.value;
    }
    await postNewFeedBack(card);
    for (const elem of document.querySelectorAll("input[type=text]")){
        elem.value = "";
    }
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


//FUNCTIONS

async function postNewFeedBack(card){
    try {
        const response = await fetch('http://localhost:8080/users/'+username+'/cards', {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-type': 'application/json'
            },
            body: JSON.stringify(card)
        });

        await response.json();
    } catch (e) {
        console.error(e);
        alert("Smth went wrong");
    }
}

// function checkLimitCheckedBoxes(){
//     for (const elem of document.querySelectorAll("input[type=checkbox]")){
//         elem.addEventListener("change", function (event){
//             if (this.siblings(':checked').len)
//         })
//     }
// }