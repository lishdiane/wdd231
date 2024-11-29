//-----Create business cards for spotlight-----//
getFilteredBusinesses();


async function getFilteredBusinesses() {
    const response = await fetch("data/members.json");
    if (response.ok) {
        const data = await response.json();
        const filteredData = data.filter((item) => item.membership_level > 2);
        createSpotlightBusinessCards(filteredData);
    }
}

function cardSpotlightTemplate(business) {
    return `
        <section class="card">
            <div>
                <h4>${business.name}</h4>
                <div class='membership'>${createMembershipStatus(business)}</div>
            </div>
            <div>
                <div>
                    <img loading="lazy" src="${business.image}" alt="${business.name} image" width="100" height="100">
                </div>
                <div class="spotlight-info">
                    <p>${business.address}</p>
                    <p>${business.phone_numbers}</p>
                    <p><a href="${business.url}">${business.url}</a></p>
                </div>
            </div>
        </section>`
}

function createMembershipStatus(business) {
    if (business.membership_level == 3) {
        return `<div style="background-color: silver; border: 1px solid grey;">
        <p>SILVER</p>
        <p>Membership</p>
        <p>&#9733 &#9733 &#9733</p>
        </div>`
    } else if (business.membership_level == 4) {
        return `<div style="background-color: #FFCA4E; border: 1px solid #B37D01; color: #664801;">
        <p>GOLD</p>
        <p>Membership</p>
        <p>&#9733&#9733&#9733&#9733</p>
        </div>`
    }
}


function createSpotlightBusinessCards(array) {
    const length = array.length;
    const businesses = [];
    let randomChoice = "";

    for (let i = 0; i < 3; i++) {
        do {
            const randomIndex = Math.floor(Math.random() * (length));
            randomChoice = array[randomIndex];
        } while ((businesses.includes(randomChoice)))

        businesses.push(randomChoice);
    }

    const business = businesses.map((item) => cardSpotlightTemplate(item))
    document.querySelector(".spotlight").innerHTML = business.join("");
}

//-----Weather-----//

const currentWeather = document.querySelector(".current-weather");
const forcast = document.querySelector(".forcast")

const currentUrl = "https://api.openweathermap.org/data/2.5/weather?lat=42.86&lon=-112.45&appid=c6f08ca845cd7ee8b38b3f5b7128987a&units=imperial";
const forcastUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=42.86&lon=-112.45&appid=c6f08ca845cd7ee8b38b3f5b7128987a&units=imperial";

apiFetch(currentUrl);

apiFetch(forcastUrl);

async function apiFetch(url) {
    try {
        const response = await fetch(url);
        if (response.ok) {
            data = await response.json();

            if (url == currentUrl) {
                displayResults(data);

            } else if (url == forcastUrl) {
                console.log(data);
                createForcastCards(data)
              
            }
        } else {
            throw Error(await response.text());
        };
    } catch (error) {
        console.log(error);
    };
};

function displayResults(data) {
    currentWeather.innerHTML = createCurrentWeatherTemplate(data);
};

function createCurrentWeatherTemplate(data) {

    return `<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="${data.weather[0].description}" width="120px" height="120">
    <div>
    <p><strong>${data.main.temp}</strong>&deg;F</p>
    <p class="weather-description">${data.weather[0].description}</p>
    <p>High: ${data.main.temp_max}&deg</p>
    <p>Low: ${data.main.temp_min}&deg</p>
    <p>Humidity: ${data.main.humidity}%</p>
    <p>Sunrise: ${(new Date(data.sys.sunrise * 1000)).toLocaleTimeString("en-US")}</p>
    <p>Sunset: ${(new Date(data.sys.sunset * 1000)).toLocaleTimeString("en-US")}</p>
    </div>`
};

function createForcastCards(data) {
    const forcast = document.querySelector(".forcast");

    const dayOneForcast = filterArray(data.list, getFutureDate(1));
    const dayTwoForcast = filterArray(data.list, getFutureDate(2));
    const dayThreeForcast = filterArray(data.list, getFutureDate(3));

    const dayOneForcastDate = getFullDate(dayOneForcast[0].dt_txt);
    const dayTwoForcastDate = getFullDate(dayTwoForcast[0].dt_txt);
    const dayThreeForcastDate = getFullDate(dayThreeForcast[0].dt_txt);

    const dayOneHigh = calculateForcastHigh(dayOneForcast);
    const dayTwoHigh = calculateForcastHigh(dayTwoForcast);
    const dayThreeHigh = calculateForcastHigh(dayThreeForcast);

    const forcasts = [

        {
            date: dayOneForcastDate,
            temp: dayOneHigh,
            description: dayOneForcast[5].weather[0].description,
            icon: dayOneForcast[5].weather[0].icon
        },

        {
            date: dayTwoForcastDate,
            temp: dayTwoHigh,
            description: dayTwoForcast[5].weather[0].description,
            icon: dayTwoForcast[5].weather[0].icon
        },

        {
            date: dayThreeForcastDate,
            temp: dayThreeHigh,
            description: dayThreeForcast[5].weather[0].description,
            icon: dayThreeForcast[5].weather[0].icon
        }
    ];

    forcast.innerHTML = forcasts.map((day) => createForcastTemplate(day.date, day.temp, day.description, day.icon)).join("");
}

function createForcastTemplate(date, temp, description, icon) {
    return `<section class="forcast-card">
    <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}" width="100" height="100">
    <div>
    <h4>${date}</h4>
    <p class="weather-description">${description}</p>
    <p>High: ${temp}&deg;F</p>
    <div>
    </section>`
};

function getFullDate(dt) {
    const day = new Date(dt);
    const options = {
        weeekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    };

    return day.toLocaleString("en-us", options);

}

function calculateForcastHigh(array) {

    let high = 0;
    for (let i = 0; i < array.length; i++) {
        const temp = array[i].main.temp;

        if (temp > high) {
            high = temp;
        }
    }
    return high;
}

function getFutureDate(days) {
    const today = new Date();
    const date = today.getDate() + days;
    return date;
}

function filterArray(array, futureDate) {
    const filteredArray = array.filter((item) => {
        const itemDay = new Date(item.dt_txt);
        const itemDate = itemDay.getDate();
        if (itemDate == futureDate) {
            return item;
        };
    });
    return filteredArray;
}