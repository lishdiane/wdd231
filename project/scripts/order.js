// display order items

displayOrder(order);

function displayOrder(order) {
    const tbody = document.querySelector("tbody");
    const table = document.querySelector("table");
    tbody.innerHTMl = "";
    

    if (order == 0) {
        table.innerHTML = "There are no items in your cart. Go to our menu to add items to your order."
    }

    order.forEach((item) => {
        const tr = document.createElement("tr");
        const td = document.createElement("td");
        const buttonSubtract = document.createElement("button");
        buttonSubtract.textContent = "-";
        const buttonAdd = document.createElement("button");
        buttonAdd.textContent = "+";
        const name = item.name;
        let textNode = document.createTextNode(item.quantity);
        
        tr.innerHTML = 
        `<td>${name}</td>`;

        td.appendChild(buttonSubtract);
        td.appendChild(textNode);
        td.appendChild(buttonAdd);

        tr.appendChild(td);
        tbody.appendChild(tr);
        displayTotal();

        buttonSubtract.addEventListener("click", () => {
            if (item.quantity == 0) {
                item.quantity = 0;
                textNode.textContent = item.quantity;
            } else if (item.quantity == 1){
                const index = order.indexOf(item);
                order.splice(index, 1);
                tr.remove();
                if (order == 0) {
                    displayOrder(order);
                }
            }else {
                item.quantity -= 1;
                textNode.textContent = item.quantity;
            };
            localStorage.setItem("order", JSON.stringify(order));
            itemNumber.textContent = getTotalItems(order);
            displayTotal();
        });

        buttonAdd.addEventListener("click", () => {
            item.quantity += 1;
            textNode.textContent = item.quantity;
            localStorage.setItem("order", JSON.stringify(order));
            itemNumber.textContent = getTotalItems(order);
            displayTotal();
        });

    });
}

// display order total

function displayTotal(){

const total = document.querySelector("#total");
let totalPrice = 0;


order.forEach((item) => {
    const price = item.price * item.quantity;
    totalPrice += price;
});

total.textContent = `$${totalPrice.toFixed(2)}`;
}

//form load time stamp//
const form = document.querySelector("form");
form.onclick = getTodaysDate();

function getTodaysDate() {
    const today = new Date();
    console.log(today.toString());
    document.querySelector("#timestamp").value = today.toString();
}