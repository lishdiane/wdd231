// get form info //
const currentUrl = window.location.href;
const everything = currentUrl.split("?");
let formData = everything[1].split("&");
const thankyou = document.querySelector("#thankyou");

thankyou.innerHTML = `
<p>Your order was successful! Allow 20 min for your order to be ready for pick-up.</p>
<p><strong>Name:</strong> ${capitalize(show("name"))}</p>
<p><strong>Your Phone:</strong> ${capitalize(show("phone"))}</p>
<p>Order time: ${show("timestamp")}</p>
`

function show(info) {
    let result = "";
    formData.forEach((item) => {
        if (item.startsWith(info)) {
            result = item.split("=")[1].replace("%40", "@").replaceAll("%3A", ":").replaceAll("+", " ").replaceAll("%28", "(").replaceAll("%29", ")");
        };
    });
    return(result);
}

function capitalize(string) {
    return`${string.charAt(0).toUpperCase()}${string.slice(1)}`
}

