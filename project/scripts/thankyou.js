// get form info //
const currentUrl = window.location.href;
const everything = currentUrl.split("?");
let formData = everything[1].split("&");
const thankyou = document.querySelector("#thankyou");

thankyou.innerHTML = `
<p>Thank you for signing up for our newsletter! You will receive an email soon.</p>
<p><strong>Name:</strong> ${capitalize(show("name"))}</p>
<p><strong>Your Email:</strong><a href="mailto:${show("email")}"> ${show("email")}</a></p>
`

function show(info) {
    let result = "";
    formData.forEach((item) => {
        if (item.startsWith(info)) {
            result = item.split("=")[1].replace("%40", "@").replace("+", " ");
        };
    });
    return(result);
}

function capitalize(string) {
    return`${string.charAt(0).toUpperCase()}${string.slice(1)}`
}
