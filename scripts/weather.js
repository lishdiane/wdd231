const currentTemp = document.querySelector("#current-temp");
const weatherIcon = document.querySelector("#weather-icon");
const iconCaption = document.querySelector("figcaption");

const url = "https://api.openweathermap.org/data/2.5/weather?lat=49.75&lon=6.64&appid=c6f08ca845cd7ee8b38b3f5b7128987a&units=imperial";

async function apiFetch() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            displayResults(data);
        } else {
            throw Error(await response.text());
        }
    } catch(error) {
        console.log(error);
    }
};

apiFetch()

function displayResults(data) {
    currentTemp.innerHTML = `${data.main.temp}&deg;F`;
    weatherIcon.setAttribute("src", 'https://openweathermap.org/img/wn/10n@2x.png');
    weatherIcon.setAttribute("alt", `${data.weather[0].description}`);
    iconCaption.innerHTML = `${data.weather[0].description}`
}   

    