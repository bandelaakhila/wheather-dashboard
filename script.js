const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weather_img = document.querySelector('.weather-image');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind-speed');
const location_not_found = document.querySelector('.location-not-found');
const weather_body = document.querySelector('.weather-body');
const weather_box = document.querySelector('.weather-box');
const weather_details = document.querySelector('.weather-details');

async function checkWeather(city) {
    const api_key = "c2d6bf8956dcfec5ef3e7c1316229bd4";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;
    
    try {
        const weather_data = await fetch(url).then(response => response.json());

        if (weather_data.cod === "404") {
            location_not_found.style.display = "flex";
            weather_body.style.display = "none";
            weather_box.style.display = "none";
            weather_details.style.display = "none";
            return;
        }

        // Display sections
        location_not_found.style.display = "none";
        weather_body.style.display = "flex";
        weather_box.style.display = "block";
        weather_details.style.display = "flex";

        // Update weather data
        temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;
        description.innerHTML = weather_data.weather[0].description;
        humidity.innerHTML = `${weather_data.main.humidity}%`;
        wind_speed.innerHTML = `${weather_data.wind.speed} Km/H`;

        // Set weather image
        switch (weather_data.weather[0].main) {
            case 'Clouds':
                weather_img.src = "/assets/cloud.jpg";
                break;
            case 'Clear':
                weather_img.src = "/assets/clear.jpg";
                break;
            case 'Rain':
                weather_img.src = "/assets/rain.jpg";
                break;
            case 'Mist':
                weather_img.src = "/assets/mist.jpg";
                break;
            case 'Snow':
                weather_img.src = "/assets/snow.jpg";
                break;
            default:
                weather_img.src = "/assets/default.jpg";
        }

    } catch (error) {
        console.error("Error fetching weather:", error);
        location_not_found.style.display = "flex";
        weather_body.style.display = "none";
        weather_box.style.display = "none";
        weather_details.style.display = "none";
    }
}

// Event listener
searchBtn.addEventListener('click', () => {
    const city = inputBox.value.trim();
    if (city !== "") {
        checkWeather(city);
    }
});
