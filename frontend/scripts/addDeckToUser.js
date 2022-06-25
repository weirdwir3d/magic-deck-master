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

async function postNewFeedBack(deck){
    try {
        const response = await fetch('http://localhost:8080/users/abc/decks/add-deck', {
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