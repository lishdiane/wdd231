// days since last visited

const msToDays = 86400000;
const lastVisited = JSON.parse(localStorage.getItem("visited")) || [];
const todaysDate = Date.now();
let daysSinceVisited = 0;
const message = document.querySelector(".welcome-message");
let content = "Welcome! Let us know if you have any questions.";

if (lastVisited.length !== 0) {
    daysSinceVisited = (todaysDate - lastVisited) / msToDays;

    if (daysSinceVisited < 1) {
        content = "Back so soon! Awesome!";
    } else if (daysSinceVisited > 1 && daysSinceVisited < 2) {
        content = `You last visited ${daysSinceVisited.toFixed(0)} day ago.`;
    } else {
        content = `You last visited ${daysSinceVisited.toFixed(0)} days ago.`;
    };

};

message.innerHTML = content;

localStorage.setItem("visited", Date.now());
