function getWeather() {
    const locationInput = document.getElementById('location');
    const location = locationInput.value;

    if (!location) {
        alert('Please enter a location.');
        return;
    }

    const apiKey = '9d35edb9b54410062b4fd180631a2ec6';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}

function displayWeather(weatherData) {
    const temperatureDiv = document.getElementById('temperature');
    const descriptionDiv = document.getElementById('weather-description');

    temperatureDiv.innerHTML = `<p>Temperature: ${weatherData.main.temp}°C</p>`;
    descriptionDiv.innerHTML = `<p>Weather: ${weatherData.weather[0].description}</p>`;

    fetch('/get_outfit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ temperature: weatherData.main.temp }),
    })
    .then(response => response.json())
    .then(data => {
        const outfitDiv = document.getElementById('outfitRecommendation');
        outfitDiv.innerHTML = `<p>Outfit Recommendation: ${data.outfit}</p>`;
    })
    .catch(error => {
        console.error('Error fetching outfit recommendation:', error);
    });
}
