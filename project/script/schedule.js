import { places } from '../data/games.mjs'

// DOM Elements
const locationFilter = document.getElementById('location-filter');
const dateFilter = document.getElementById('date-filter');
const applyFiltersBtn = document.getElementById('apply-filters');
const resetFiltersBtn = document.getElementById('reset-filters');
const upcomingGames = document.getElementById('upcoming-games');

// Display games function
function displayItems(games) {
    upcomingGames.innerHTML = '';
    if (games.length > 0) {
      games.forEach(game => {
        const card = document.createElement('div');
        card.className = 'game-card';
        card.innerHTML = `
          <h3>${game.location}</h3>
          <p>
            <strong>Address:</strong> ${game.address}<br>
            <strong>Date:</strong> ${game.date}<br>
            <strong>Time:</strong> ${game.time}<br>
            <strong>Players:</strong> ${game.playersRegistered}/${game.maxPlayers}<br>
            <strong>Skill Level:</strong> ${game.skillLevel}
          </p>
        `;
        upcomingGames.appendChild(card);
      });
    } else {
      upcomingGames.innerHTML = '<p>No games found for this location and date.</p>';
    }
  }
  

// Initialize schedule page
function initSchedulePage() {
  applyFiltersBtn.addEventListener('click', () => {
    const selectedLocation = locationFilter.value;
    const selectedDate = dateFilter.value;

    const filteredGames = places.filter(game => {
      const matchLocation = selectedLocation === 'all' || game.location === selectedLocation;
      const matchDate = !selectedDate || game.date === selectedDate;
      return matchLocation && matchDate;
    });

    displayItems(filteredGames);
  });

  resetFiltersBtn.addEventListener('click', () => {
    locationFilter.value = 'all';
    dateFilter.value = '';
    upcomingGames.innerHTML = ''; // clear content
  });

  // Nenhuma chamada inicial para displayItems()
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('#upcoming-games')) {
    initSchedulePage();
  }
});
