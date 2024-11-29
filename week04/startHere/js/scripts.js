const currentUrl = window.location.href;

const everything = currentUrl.split("?");

let formData = everything[1].split("&");

const results = document.querySelector("#results");

results.innerHTML = `
<p>Appointment for ${show("first")} ${show("last")}</p>
<p>Proxy ${show("ordinance")} on ${show("fecha")} in the ${show("location")} Temple</p>
<p>Your Phone: ${show("phone")}</p>
<p>Your Email: <a href="mailto:${show("email")}">${show("email")}<a/></p>
`

function show(info) {
    let result = "";
    formData.forEach((element) => {
        if (element.startsWith(info)) {
            result = element.split("=")[1].replace("%40", "@");
        };
    });
    return(result);  
}