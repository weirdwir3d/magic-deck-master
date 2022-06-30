const urlParams = new URLSearchParams(window.location.search);
console.log("displaying message for user: ", urlParams.get('username'));
const message = document.getElementById("welcome-message");

async function getUser() {
    try {
        const response = await fetch('http://localhost:8080/users/'+urlParams.get('username'));
        const responseJson = await response.json();
        console.log(responseJson);
    message.innerHTML = urlParams.get('username') + " successfully logged in";
    console.log(urlParams.get('username'));
    } catch (e){
        console.error(e);
    }
}

getUser();