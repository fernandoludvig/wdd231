// Get current year
const currentYear = new Date().getFullYear();

// Insert current year into the first paragraph of the footer
const footerFirstParagraph = document.querySelector('footer p:first-of-type');
footerFirstParagraph.textContent = `© ${currentYear} Fernando Ludvig | Brazil`;

// Get last modified date
const lastModifiedDate = document.lastModified;

// Insert last modified date into the second paragraph of the footer
const footerSecondParagraph = document.querySelector('footer p:nth-of-type(2)');
footerSecondParagraph.textContent = `Last Update: ${lastModifiedDate}`;

// Toggle navigation menu for small screens
document.getElementById('menu-toggle').addEventListener('click', function() {
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.toggle('show');
});