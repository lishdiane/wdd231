// get form info //
const currentUrl = window.location.href;
const everything = currentUrl.split("?");
let formData = everything[1].split("&");
const thankyou = document.querySelector("#thankyou");

thankyou.innerHTML = `
<p>Thank you for applying! Some one will be in contact.</p>
<p><strong>Name:</strong> ${capitalize(show("firstname"))} ${capitalize(show("lastname"))}</p>
<p><strong>Your Phone:</strong> ${capitalize(show("phone"))}</p>
<p><strong>Your Email:</strong><a href="mailto:${show("email")}"> ${show("email")}</a></p>
<p><strong>Business/Organization:</strong> ${capitalize(show("organization-name"))}</p>
<p>${show("timestamp")}</p>
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

