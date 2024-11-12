const url = "https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json";
const cards = document.querySelector("#cards");

async function getProphetData(url) {
    const response = await fetch(url);
    if (response.ok) {
        const data = await response.json();
        displayProphets(data.prophets)
    }
}

const displayProphets = (prophets) => {
    prophets.forEach((prophet) => {
        let card = document.createElement("section");
        let fullName = document.createElement("h2");
        let portrait = document.createElement("img");

        fullName.innerHTML = `${prophet.name} ${prophet.lastname} - ${prophet.order}${getOrderSuffix(prophet)} Latter-day President`;

        portrait.setAttribute("src", prophet.imageurl);
        portrait.setAttribute("alt", `Portrait of ${prophet.name} ${prophet.lastname}`);
        portrait.setAttribute("loading", 'lazy');
        portrait.setAttribute("width", '200');
        portrait.setAttribute("height", "300");

        card.appendChild(fullName);
        card.appendChild(portrait);
        cards.appendChild(card);
    });
}

function getOrderSuffix(prophet) {
    if (prophet.order.toString().endsWith(1) && prophet.order !== 11) {
        return "st";
    } else if (prophet.order.toString().endsWith(2) && prophet.order !== 12) {
        return "nd";
    } else if (prophet.order.toString().endsWith(3) && prophet.order !== 13) {
        return "rd";
    } else {
        return "th";
    }
}

getProphetData(url);