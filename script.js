// Weather app

const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card"); // Fixed: added dot before 'card'
const apikey = "bf25a6d573ccabcee79ed081510b32a6";

weatherForm.addEventListener("submit", async event => {
    event.preventDefault(); // Fixed: added parentheses
    
    const city = cityInput.value;

    if(city){
        try{
            const weatherData = await getWeatherData(city); 
            displayWeatherInfo(weatherData);
        }
        catch(error){
            console.error(error);
            displayError(error);
        }
    }
    else{
        displayError("Please enter a city");
    }
});

async function getWeatherData(city) {
    const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`; // Added units=metric for Celsius
    
    const response = await fetch(apiurl);
    
    if(!response.ok) {
        throw new Error("Could not fetch weather data");
    }
    
    return await response.json();
}

function displayWeatherInfo(data){
    // Clear previous content
    card.textContent = "";
    
    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");
    
    cityDisplay.textContent = data.name;
    tempDisplay.textContent = `${Math.round(data.main.temp)}°C`;
    humidityDisplay.textContent = `Humidity: ${data.main.humidity}%`;
    descDisplay.textContent = data.weather[0].description;
    weatherEmoji.textContent = getWeatherEmoji(data.weather[0].id);
    
    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    descDisplay.classList.add("descDisplay");
    weatherEmoji.classList.add("weatherEmoji");
    
    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(weatherEmoji);
}

function getWeatherEmoji(weatherId){
    // Thunderstorm
    if(weatherId >= 200 && weatherId < 300) {
        return "⛈️";
    }
    // Drizzle
    else if(weatherId >= 300 && weatherId < 400) {
        return "🌧️";
    }
    // Rain
    else if(weatherId >= 500 && weatherId < 600) {
        return "☔";
    }
    // Snow
    else if(weatherId >= 600 && weatherId < 700) {
        return "❄️";
    }
    // Atmosphere (fog, mist, etc.)
    else if(weatherId >= 700 && weatherId < 800) {
        return "🌫️";
    }
    // Clear
    else if(weatherId === 800) {
        return "☀️";
    }
    // Clouds
    else if(weatherId > 800) {
        return "☁️";
    }
    // Default
    else {
        return "🌈";
    }
}

function displayError(message){
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    card.textContent = "";
    card.style.display = "flex"; // Make sure card is visible
    card.appendChild(errorDisplay);
}