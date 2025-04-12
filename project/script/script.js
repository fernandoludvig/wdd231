// DOM Elements
const modal = document.getElementById('modal');
const openModalBtn = document.getElementById('open-modal');
const closeModalBtn = document.querySelector('.close');
const joinForm = document.getElementById('join-form');
const mainNav = document.getElementById('main-nav');
const currentYear = document.getElementById('current-year');
const lastModified = document.getElementById('last-modified');

document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menu-toggle');
    const navUl = document.querySelector('nav ul');
    
    menuToggle.addEventListener('click', function() {
      navUl.classList.toggle('show');
    });
  });
// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    // Set current year
    currentYear.textContent = new Date().getFullYear();
    
    // Set last modified date
    lastModified.textContent = `Last Updated: ${document.lastModified}`;
    
    // Initialize modal
    initModal();
    

    // Load games on home page
    if (document.querySelector('#games-list')) {
        fetchGames();
    }
    
    // Load weather on home page
    if (document.querySelector('#weather-data')) {
        fetchWeather();
    }
    
    // Handle form submission on form action page
    if (document.querySelector('#form-data-display')) {
        displayFormData();
    }
});

// Modal Functions
function initModal() {
    if (!modal) return;
    
    openModalBtn?.addEventListener('click', (e) => {
        e.preventDefault(); // Isso impede que o link faça o redirecionamento
        modal.style.display = 'flex';
        modal.setAttribute('aria-hidden', 'false');
    });
    
    closeModalBtn?.addEventListener('click', () => closeModal());
    
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    joinForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(joinForm);
        const playerData = Object.fromEntries(formData.entries());
    
        // Save to localStorage
        localStorage.setItem('playerData', JSON.stringify(playerData));
    
        // Agora, você pode redirecionar manualmente se quiser, ou deixar o formulário seguir seu fluxo.
        window.location.href = joinForm.action + '?' + new URLSearchParams(playerData).toString();
    });
}

function closeModal() {
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
}



// Form Data Display (for form-action.html)
function displayFormData() {
    const formDataDisplay = document.getElementById('form-data-display');
    const urlParams = new URLSearchParams(window.location.search);
    
    if (urlParams.toString()) {
        let html = '<ul>';
        urlParams.forEach((value, key) => {
            html += `<li><strong>${key}:</strong> ${value}</li>`;
        });
        html += '</ul>';
        formDataDisplay.innerHTML = html;
    } else {
        formDataDisplay.innerHTML = '<p>No form data submitted.</p>';
    }
}

// Export functions for use in other modules
export { closeModal };