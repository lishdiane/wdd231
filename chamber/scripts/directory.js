//-----List/grid view-----//

const listButton = document.querySelector(".list-view");
const gridButton = document.querySelector(".grid-view");
const businessCards = document.querySelector(".business-cards");

listButton.addEventListener("click", () => {
    businessCards.classList.add("list");
});

gridButton.addEventListener("click", () => {
    businessCards.classList.remove("list");
});

//-----Search-----//

const searchButton = document.querySelector("#search-button");
const input = document.querySelector("#search");
const message = document.querySelector(".message");
let filteredArray = [];

input.addEventListener("keyup", () => {
    let value = input.value;
    filteredArray = [];
    filterList(value);
});

function filterList(searchValue) {
    const lowerValue = searchValue.toLowerCase();

    if (lowerValue !== "") {
        results.forEach(element => {
            
            let lowerName = element.name.toLowerCase();

            if (lowerName.startsWith(lowerValue)) {
                filteredArray = results.filter(item => {
                    lowerName = item.name.toLowerCase();
                    return lowerName.startsWith(lowerValue);
                });
            };

            createBusinessCards(filteredArray);

            if (filteredArray.length == 0) {
                createBusinessCards(results);
            };

            searchButton.addEventListener("click", () => {
                if (filteredArray.length == 0) {
                    message.hidden = false;
                    input.value = "";
                } else {
                    createBusinessCards(filteredArray);
                };
            });
        });

    } else {
        createBusinessCards(results);
    }
};

input.addEventListener("focus", () => message.hidden = true);