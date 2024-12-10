// create menu

getMenu();
itemNumber.textContent = getTotalItems(order);
// const appetizers = filterMenu(results, appetizers);
// const entrees = filterMenu(results, entrees);
// const lunch = filterMenu(results, lunch);
// const sides = filterMenu(results, sides);
// const drinks = filterMenu(results, drinks);
// const desserts = filterMenu(results, desserts);



async function getMenu() {
    const response = await fetch("data/menu.json");
    if(response.ok) {
        const data = await response.json();
        createMenuCards(data);
    }
}

function createMenuCards(menu) {

    menu.forEach((item) => {
        const itemDiv = document.createElement("div");
        
        itemDiv.classList.add("card");
        
        if (menu[0] == item || menu[1] == item) {
            itemDiv.innerHTML =  `
            <img src="${item.img}" alt="${item.name} image" width="200" height="113">
            <p><strong>${item.name}</strong></p>
            <p>Price: $${item.price}</p>`;
        } else {
            itemDiv.innerHTML =  `
            <img loading="lazy" src="${item.img}" alt="${item.name} image" width="200" height="113">
            <p><strong>${item.name}</strong></p>
            <p>Price: $${item.price}</p>`;
        }


        const moreInfo = document.createElement("p");
        moreInfo.innerHTML = "Click here for more info!";
        
        const button = document.createElement("button");
        button.innerHTML = "Add to bag";

        itemDiv.appendChild(moreInfo);
        itemDiv.appendChild(button);
    
        button.addEventListener("click", () => {
            if ("quantity" in item) {
                item.quantity += 1;
            } else {
                item.quantity = 1;
                order.push(item);
            }
            
            localStorage.setItem("order", JSON.stringify(order));

            itemNumber.textContent = getTotalItems(order);
        
        });

        moreInfo.addEventListener("click", () => {
            displayItemDetails(item);
        });
        document.querySelector("#food-menu-cards").appendChild(itemDiv);
    });
}

function displayItemDetails(item) {
    const itemDetails = document.querySelector("#item-details");
    itemDetails.innerHTML = "";
    itemDetails.innerHTML =  
        `<button id="closeButton">Close</button>
        <p><strong>${item.name}</strong></p>
        <p>${item.category}</p>
        <p>${item.description}</p>
        <p><strong>Calories:</strong> ${item.calories}</p>
        <p><strong>Price:</strong> $${item.price}</p>
        `;
        
    itemDetails.showModal();
    closeButton.addEventListener("click", () => itemDetails.close());
}

function filterMenu(menu, category) {
    return menu.filter((item) => item.category == category)
}
