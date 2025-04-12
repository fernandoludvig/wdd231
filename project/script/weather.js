export async function fetchWeather() {
    const currentContainer = document.getElementById('current-weather');
    const tomorrowContainer = document.getElementById('tomorrow-weather');
    if (!currentContainer || !tomorrowContainer) return;

    try {
        const apiKey = '09f41b3700b1f5ec16123b2e3e4bddb6';
        const city = 'Florianopolis';

        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`);

        if (!response.ok) {
            throw new Error('Weather data not available');
        }

        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        console.error('Error fetching weather:', error);
        currentContainer.innerHTML = '<p>Weather data currently unavailable</p>';
        tomorrowContainer.innerHTML = '';
    }
}

function displayWeather(data) {
    const currentContainer = document.getElementById('current-weather');
    const tomorrowContainer = document.getElementById('tomorrow-weather');

    const current = data.list[0];
    const temp = Math.round(current.main.temp);
    const description = current.weather[0].description;
    const iconUrl = `https://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`;

    currentContainer.innerHTML = `
        <h3>Current Weather</h3>
        <img src="${iconUrl}" alt="${description}" loading="lazy">
        <p><strong>Temperature:</strong> ${temp}°C</p>
        <p><strong>Conditions:</strong> ${description}</p>
        <p><strong>Humidity:</strong> ${current.main.humidity}%</p>
        <p><strong>Wind:</strong> ${current.wind.speed} m/s</p>
    `;

    const tomorrow = data.list.find(item => item.dt_txt.includes("12:00:00") && isTomorrow(item.dt_txt));
    if (tomorrow) {
        const tTemp = Math.round(tomorrow.main.temp);
        const tDesc = tomorrow.weather[0].description;
        const tIconUrl = `https://openweathermap.org/img/wn/${tomorrow.weather[0].icon}@2x.png`;

        tomorrowContainer.innerHTML = `
            <h3>Tomorrow's Forecast</h3>
            <img src="${tIconUrl}" alt="${tDesc}" loading="lazy">
            <p><strong>Temperature:</strong> ${tTemp}°C</p>
            <p><strong>Conditions:</strong> ${tDesc}</p>
        `;
    }
}

function isTomorrow(dateString) {
    const today = new Date();
    const date = new Date(dateString);
    return date.getDate() === today.getDate() + 1;
}

fetchWeather();
