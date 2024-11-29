// ------ Year, and modification date-----//

const year = document.querySelector("#currentYear");
const modified = document.querySelector("#lastModified");

const today = new Date();

year.innerHTML = today.getFullYear();
modified.innerHTML = document.lastModified;

//-----hamburger menu-----//

const button = document.querySelector(".menu");
const nav = document.querySelector(".navigation");

button.addEventListener("click", () => {
    button.classList.toggle("show");
    nav.classList.toggle("show");
});


