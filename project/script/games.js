import { places } from '../data/games.mjs'

const allPlaces = document.querySelector('#allplaces');
const visitMessage = document.getElementById('visit-message');
const dialog = document.querySelector('#mydialog');
const dialogText = document.querySelector('#dialogtext');
const dialogClose = document.querySelector('#dialog-close');

function displayItems(places) {
    places.forEach(place => {
        const card = document.createElement('div');

        const thename = document.createElement('h2');
        thename.textContent = place.location;
        card.appendChild(thename);


        const theadd = document.createElement('p');
        theadd.textContent = `Address: ${place.address}`;
        card.appendChild(theadd);


        const button = document.createElement('button');
        button.innerHTML = "More Info";
        button.className = "learn-more"; // Classe CSS do botão
        button.addEventListener('click', () => {
            dialogText.innerHTML =
                `<h3>${place.location}</h3>
                 <p>${place.address}</p>
                 <b>Date:</b> ${place.date}</br>
                 <b>Time:</b>${place.time}</br>
                 <b>Players Registered: </b>${place.playersRegistered}</br>
                 <b>Max Players:</b> ${place.maxPlayers}</br>
                 <b>Skill Level:</b> ${place.skillLevel}
                 `
                ;
            dialog.showModal();
        });
        card.appendChild(button);

        allPlaces.appendChild(card);
    });
}

displayItems(places);

dialogClose.addEventListener('click', () => {
    dialog.close();
});

// Função que exibe uma mensagem com base na última visita do usuário
function displayVisitMessage() {
    // Recupera do localStorage a data da última visita (se existir)
    const lastVisit = localStorage.getItem('lastVisit');

    // Obtém a data/hora atual em milissegundos desde 1 de janeiro de 1970 (timestamp)
    const now = Date.now();
    let message= "";
    
    // Se não existe registro da última visita, significa que é a primeira vez
    if (!lastVisit) {
        message = "Welcome! Let us know if you have any questions."; // Mensagem de boas-vindas
    } else {
        // Calcula quantos dias se passaram desde a última visita
        const daysSince = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));
        /*
            Explicação:
            - now e lastVisit são timestamps em milissegundos
            - 1000 = mil milissegundos = 1 segundo
            - 60 * 1000 = 60 segundos = 1 minuto
            - 60 * 60 * 1000 = 1 hora
            - 24 * 60 * 60 * 1000 = 1 dia
            → então: (now - lastVisit) / (1000 * 60 * 60 * 24) = diferença em dias
        */

        // Se o usuário voltou no mesmo dia
        if (daysSince < 1) {
            message = "Back so soon! Awesome!"; // Mensagem de retorno rápido
        } else {
            // Define se o texto será "day" ou "days"
            const dayText = daysSince === 1 ? "day" : "days";
            message = `You last visited ${daysSince} ${dayText} ago.`; // Exibe a quantidade de dias desde a última visita
        }
    }
    
    // Insere a mensagem no dialog
    dialogText.innerHTML = `<p>${message}</p>`;
    dialog.showModal(); // Exibe o modal automaticamente ao entrar

    // Salva a data/hora atual como sendo a última visita (para a próxima vez que acessar a página)
    localStorage.setItem('lastVisit', now);
}

// Chama a função para verificar e exibir a mensagem de visita
displayVisitMessage();
