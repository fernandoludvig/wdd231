// Importa a lista de lugares (places) de um arquivo externo chamado 'places.mjs'
import { places } from '../data/places.mjs';

// Seleciona o elemento HTML com ID 'allplaces', onde os cards dos lugares serão adicionados
const allPlaces = document.querySelector('#allplaces');

// Seleciona o elemento com ID 'visit-message', onde será exibida a mensagem de boas-vindas ou última visita
const visitMessage = document.getElementById('visit-message');

// Seleciona o elemento <dialog> com ID 'mydialog', que é uma janela modal para mostrar detalhes
const dialog = document.querySelector('#mydialog');

// Seleciona o elemento dentro do diálogo que receberá o conteúdo (texto e imagem do lugar)
const dialogText = document.querySelector('#dialogtext');

// Seleciona o botão que fecha o diálogo
const dialogClose = document.querySelector('#dialog-close');

// Função para exibir os lugares (places) na página
function displayItems(places) {
    // Percorre cada lugar no array 'places'
    places.forEach(place => {
        // Cria uma div que servirá como card individual para o lugar
        const thecard = document.createElement('div');

        // Cria uma imagem para o lugar
        const photo = document.createElement('img');
        photo.src = `images/${place.photo_url}`; // Define o caminho da imagem com base na propriedade photo_url
        photo.alt = place.name; // Define o texto alternativo (acessibilidade)
        photo.loading = "lazy";
        thecard.appendChild(photo); // Adiciona a imagem ao card

        // Cria um título com o nome do lugar
        const thetitle = document.createElement('h2');
        thetitle.textContent = place.name; // Define o texto do título
        thecard.appendChild(thetitle); // Adiciona o título ao card

        // Cria o endereço do lugar
        const theaddress = document.createElement('address');
        theaddress.textContent = place.address; // Define o texto do endereço
        thecard.appendChild(theaddress); // Adiciona o endereço ao card

        // Cria um parágrafo com a descrição do lugar
        const thedesc = document.createElement('p');
        thedesc.textContent = place.description; // Define a descrição
        thecard.appendChild(thedesc); // Adiciona a descrição ao card

        // Cria um botão para exibir mais informações
        const learnBtn = document.createElement('button');
        learnBtn.textContent = "Learn More"; // Texto que aparece no botão
        learnBtn.className = "learn-more"; // Classe CSS do botão

        // Adiciona um evento de clique no botão
        learnBtn.addEventListener('click', () => {
            // Quando o botão é clicado, monta o conteúdo detalhado no diálogo
            dialogText.innerHTML = `
                <h3>${place.name}</h3>
                <img src="images/${place.photo_url}" alt="${place.name}" style="max-width:100%; height:auto;">
                <address>${place.address}</address>
                <p><strong>Cost:</strong> ${place.cost}</p>
                <p>${place.description}</p>
            `;
            dialog.showModal(); // Exibe o diálogo na tela
        });

        thecard.appendChild(learnBtn); // Adiciona o botão ao card

        allPlaces.appendChild(thecard); // Adiciona o card completo na seção principal da página
    });
}

// Chama a função para exibir os cards com os dados importados
displayItems(places);

// Quando o botão de fechar é clicado, o diálogo é fechado
dialogClose.addEventListener('click', () => {
    dialog.close(); // Fecha o modal (diálogo)
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
