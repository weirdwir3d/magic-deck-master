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

async function postNewFeedBack(card){
    try {
        const response = await fetch('http://localhost:8080/users/{username}/cards', {
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