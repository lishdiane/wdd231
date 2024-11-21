// ------ Year and modification date-----//

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

//-----Create business cards-----//

let results = null;

getBusinesses();

async function getBusinesses() {
    const response = await fetch("data/members.json");
    if (response.ok) {
        const data = await response.json();
        results = data;
        createBusinessCards(results);
    }
}

function cardTemplate(business) {
    return `<section class="card">
        <img loading="lazy" src="${business.image}" alt="${business.name} image" width="200" height="200">
        <p>${business.name}</p>
        <p>${business.address}</p>
        <p>${business.phone_numbers}</p>
        <p><a href="${business.url}">${business.url}</a></p>
    </section>`
}


function createBusinessCards(array) {
    const business = array.map((item) => cardTemplate(item))
    document.querySelector(".business-cards").innerHTML = business.join("");
}

//-----Weather-----//

const currentWeather = document.querySelector(".current-weather");
const forcast = document.querySelector(".forcast")

const url = "https://api.openweathermap.org/data/2.5/weather?lat=42.86&lon=112.45&appid=c6f08ca845cd7ee8b38b3f5b7128987a&units=imperial";
const forcastUrl = "https://api.openweathermap.org/data/2.5/forecast/daily?lat=42.86&lon=112.45&cnt=3&appid=c6f08ca845cd7ee8b38b3f5b7128987&units=imperial";

apiFetch();

async function apiFetch() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            console.table(data);
            displayResults(data);
        } else {
            throw Error(await response.text());
        };
    } catch(error) {
        console.log(error);
    };
};


function displayResults(data) {
   currentWeather.innerHTML = createCurrentWeatherTemplate(data);
};   

function createCurrentWeatherTemplate(data) {
    return `<img src="https://openweathermap.org/img/wn/10n@2x.png" alt="${data.weather[0].description}">
    <p><strong>${data.main.temp}</strong>&deg;F</p>
    <p>${data.weather[0].description}</p>
    <p>High:${data.main.temp_max}&deg</p>
    <p>Low:${data.main.temp_min}&deg</p>
    <p>Humidity:${data.main.humidity}%</p>
    <p>Sunrise:${data.sys.sunrise}</p>
    <p>Sunset:${data.sys.sunset}</p>`
};

function createForcastTemplate() {
    return`<p></p>
    <p></p>
    <p></p>`
};

