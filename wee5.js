type="text/javascript"
function getWeather() {
    const city = document.getElementById('city').value;
    const apiKey = 'ff55e56e0815217fc89186e8130ea814'; 
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    if (city.trim() === "") {
        document.getElementById('weather').innerHTML = "<p>Please enter a city name.</p>";
        return;
    }
    fetch(weatherUrl)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                const weather = data.weather[0].description;
                const temperature = data.main.temp;
                const humidity = data.main.humidity;
                const windSpeed = data.wind.speed;
                const weatherIcon = data.weather[0].icon;
                document.getElementById('weather').innerHTML = `
                    <h3>Weather in ${city}</h3>
                    <img src="https://openweathermap.org/img/wn/${weatherIcon}@2x.png" alt="Weather icon">
                    <p><strong>Weather:</strong> ${weather}</p>
                    <p><strong>Temperature:</strong> ${temperature} °C</p>
                    <p><strong>Humidity:</strong> ${humidity} %</p>
                    <p><strong>Wind Speed:</strong> ${windSpeed} m/s</p>
                    <h3>Weekly Forecast</h3>
                    <div id="forecast" class="forecast-container"></div>
                `;
                fetch(forecastUrl)
                    .then(response => response.json())
                    .then(forecastData => {
                        displayForecast(forecastData);
                    });

                
               
            } else {
                document.getElementById('weather').innerHTML = "<p>City not found. Please try again.</p>";
            }
        })
        .catch(error => {
            document.getElementById('weather').innerHTML = `<p>Error: ${error.message}. Please try again later.</p>`;
        });
}


function displayForecast(data) {
    let forecastHTML = "<div class='forecast-row'>";
    const forecastContainer = document.getElementById('forecast');
    forecastContainer.innerHTML = "";
    for (let i = 0; i < data.list.length; i += 8) { 
        const day = new Date(data.list[i].dt_txt).toLocaleDateString('en-US', { weekday: 'short' });
        const temp = data.list[i].main.temp;
        const icon = data.list[i].weather[0].icon;
        forecastHTML += `
            <div class="forecast-item">
                <h4>${day}</h4>
                <img src="https://openweathermap.org/img/wn/${icon}.png" alt="Weather icon" class="small-icon">
                <p><strong>${temp} °C</strong></p>
            </div>
        `;
    }
    forecastHTML += "</div>";
    forecastContainer.innerHTML = forecastHTML;
}
