// JSON data for memberships
const membershipData = {
    "NP": {
        "name": "Non-Profit Membership",
        "price": "Free",
        "benefits": [
            "Listing in our online directory",
            "Access to member-only newsletters",
            "Basic event invitations",
            "Social media mentions"
        ]
    },
    "Bronze": {
        "name": "Bronze Membership",
        "price": "$100/year",
        "benefits": [
            "All NP benefits plus:",
            "10% discount on events",
            "Business training workshops",
            "Featured in monthly newsletter",
            "Access to business resources"
        ]
    },
    "Silver": {
        "name": "Silver Membership",
        "price": "$250/year",
        "benefits": [
            "All Bronze benefits plus:",
            "25% discount on events",
            "Priority event registration",
            "Featured on homepage quarterly",
            "Access to premium training",
            "Networking opportunities"
        ]
    },
    "Gold": {
        "name": "Gold Membership",
        "price": "$500/year",
        "benefits": [
            "All Silver benefits plus:",
            "50% discount on events",
            "Homepage spotlight monthly",
            "VIP access to all events",
            "Dedicated business consultant",
            "Speaking opportunities",
            "Annual business review"
        ]
    }
};

// Global modal functions
window.openModal = function(membershipType) {
    // Create or reuse modal
    let modal = document.getElementById(`${membershipType}-modal`);
    
    if (!modal) {
        modal = document.createElement('div');
        modal.id = `${membershipType}-modal`;
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close" onclick="closeModal('${membershipType}-modal')">&times;</span>
                <h2>${membershipData[membershipType].name}</h2>
                <p><strong>Price:</strong> ${membershipData[membershipType].price}</p>
                <ul>
                    ${membershipData[membershipType].benefits.map(benefit => `<li>${benefit}</li>`).join('')}
                </ul>
            </div>
        `;
        document.body.appendChild(modal);
    }
    
    modal.style.display = 'block';
};

window.closeModal = function(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
    }
};

// Close modal when clicking outside
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
});

// Initialize membership cards animation
function initMembershipCards() {
    const cards = document.querySelectorAll('.membership-card');
    cards.forEach((card, index) => {
        card.style.setProperty('--order', index);
        card.style.animationDelay = `${index * 0.1}s`;
    });
}

function displaySubmittedData() {
    // Obter parâmetros da URL de forma mais robusta
    const urlParams = new URL(window.location.href).searchParams;
    
    // Função auxiliar para exibir dados
    const displayData = (elementId, value, defaultValue = 'Not provided') => {
        const element = document.getElementById(elementId);
        if (element) {
            element.textContent = value || defaultValue;
        }
    };

    // Exibir informações pessoais
    displayData('full-name', 
        `${urlParams.get('firstName')} ${urlParams.get('lastName')}`.trim());
    displayData('user-email', urlParams.get('email'));
    displayData('user-phone', urlParams.get('phone'));
    displayData('user-title', urlParams.get('organizationTitle'));

    // Exibir informações comerciais
    displayData('business-name', urlParams.get('businessName'));
    displayData('business-desc', urlParams.get('description'));

    // Formatar e exibir nível de associação
    const membership = urlParams.get('membership');
    if (membership && membershipData[membership]) {
        displayData('membership-level', 
            `${membershipData[membership].name} (${membershipData[membership].price})`);
    } else {
        displayData('membership-level', 'Not specified');
    }

    // Formatar e exibir timestamp
    const timestamp = urlParams.get('timestamp');
    if (timestamp) {
        try {
            const date = new Date(timestamp);
            displayData('submission-date', date.toLocaleString());
        } catch (e) {
            displayData('submission-date', 'Not available');
        }
    } else {
        displayData('submission-date', 'Not available');
    }
}

// Set timestamp and footer info
function setPageInfo() {
    // Set form timestamp if exists
    if (document.getElementById('timestamp')) {
        document.getElementById('timestamp').value = new Date().toISOString();
    }
    
    // Set footer year
    if (document.getElementById('current-year')) {
        document.getElementById('current-year').textContent = new Date().getFullYear();
    }
    
    // Set last modified date
    if (document.getElementById('modified-date')) {
        document.getElementById('modified-date').textContent = document.lastModified;
    }
}

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    setPageInfo();
    
    // Initialize membership cards if they exist
    if (document.querySelector('.membership-card')) {
        initMembershipCards();
    }
    
    // If on thankyou page, display submitted data
    if (document.querySelector('.thankyou-container')) {
        displaySubmittedData();
    }
});