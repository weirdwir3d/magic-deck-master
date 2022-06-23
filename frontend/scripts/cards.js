let cards = document.querySelectorAll(".card");
let table = document.getElementsByTagName("td");
let a = document.getElementById("filter-section");
console.log(cards);
console.log(table[0]);

for (let i = 0; i < cards.length; i++){
    cards[i].addEventListener("mouseover", function () {
        console.log(cards[i]);
        let hoverMenu = document.createElement("div");
        var rect = cards[i].getBoundingClientRect();
        console.log(rect.top, rect.right, rect.bottom, rect.left);
        hoverMenu.style.position = 'absolute';
        hoverMenu.style.width = '10em';
        hoverMenu.style.left = '5em';
        hoverMenu.style.top = '5em';
        a.appendChild(hoverMenu);
    });
}