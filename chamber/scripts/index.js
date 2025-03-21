// Get the current year
const currentYear = new Date().getFullYear();

// Get the last modified date of the document
const lastModifiedDate = document.lastModified;

// Set footer info
const footerYear = document.getElementById('footer-year');
const lastModifiedParagraph = document.getElementById('last-modified');

footerYear.textContent = `© ${currentYear} Florianopolis Chamber of Commerce`;
lastModifiedParagraph.textContent = `Last Update: ${lastModifiedDate}`;

// OpenWeatherMap API
const apiKey = '09f41b3700b1f5ec16123b2e3e4bddb6'; // Replace with your OpenWeatherMap API key
const city = 'Florianopolis';
const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

fetch(weatherUrl)
    .then(response => response.json())
    .then(data => {
        const weatherInfo = document.getElementById('weather-info');
        const weatherForecast = document.getElementById('weather-forecast');

        // Current Weather
        const current = data.list[0];
        const description = current.weather[0].description;
        const formattedDescription = description.charAt(0).toUpperCase() + description.slice(1);
        weatherInfo.innerHTML = `
        Temperature: ${current.main.temp}°C - 
        <strong>${formattedDescription}</strong>
        `;

        // 3-Day Forecast
        for (let i = 1; i <= 3; i++) {
            const forecast = data.list[i * 8]; // Approximate daily forecast
            weatherForecast.innerHTML += `
                <p>Day ${i}: ${forecast.main.temp}°C</p>
            `;
        }
    })
    .catch(error => console.error('Error fetching weather data:', error));

    const members = [
        {
            name: 'Mahil',
            logo: 'images/logo-email.webp',
            phone: '(48) 1234-5678',
            address: 'Rua das Palmeiras, 250, Florianópolis, SC',
            website: 'https://www.mahil.com.br',
            level: 'Gold'
        },
        {
            name: 'Ilha Gourmet',
            logo: 'images/gourmet.jpg',
            phone: '(48) 9876-5432',
            address: 'Rua Bocaiúva, 678, Florianópolis, SC',
            website: 'https://www.ilhagourmet.com.br/',
            level: 'Silver'
        },
        {
            name: 'Praia Surf School',
            logo: 'images/surf.jpg',
            phone: '(48) 4567-8901',
            address: 'Avenida das Rendeiras, 145, Florianópolis, SC',
            website: 'https://www.praiasurfschool.com.br/',
            level: 'Gold'
        },
        {
            name: "Ludvig Imóveis",
            logo: "images/ludvig.webp",
            phone: "+55 48 3233-1122",
            address: "Rua Almirante Lamego, 450, Florianópolis, SC",
            website: "https://www.ludvigimoveis.com.br",
            level: 'Gold'
    }];
    
    // Randomly select 2-3 Gold or Silver members
    const spotlightContainer = document.getElementById('spotlight-container');
    
    // Filter for Gold or Silver members
    const eligibleMembers = members.filter(member => member.level === 'Gold' || member.level === 'Silver');
    
    // Randomize the selection
    const selectedMembers = eligibleMembers
        .sort(() => 0.5 - Math.random()) // Shuffle the array
        .slice(0, 3); // Select the first 2-3 members
    
    // Display the selected members
    selectedMembers.forEach(member => {
        spotlightContainer.innerHTML += `
            <article class="spotlight-item">
                <img src="${member.logo}" alt="${member.name}">
                <h3>${member.name}</h3>
                <p>Phone: ${member.phone}</p>
                <p>Address: ${member.address}</p>
                <a href="${member.website}" target="_blank">Visit Website</a>
            </article>
        `;
    });