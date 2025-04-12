// Importa o array de templos de um arquivo externo
import { temples } from '../data/temples.js'

// Importa a variável "url" do mesmo arquivo (presumivelmente contém o caminho base para as imagens)
import { url } from '../data/temples.js'

// Seleciona a div onde os elementos vão aparecer (com id="showHere")
const showHere = document.querySelector('#showHere')

// Seleciona o <dialog> que será usado como modal para mostrar detalhes
const mydialog = document.querySelector('#mydialog')

// Seleciona o <h2> dentro do dialog (onde o título do templo será mostrado)
const mytitle = document.querySelector('#mydialog h2')

// Seleciona o botão dentro do dialog (será usado para fechar)
const myclose = document.querySelector('#mydialog button')

// Seleciona o parágrafo <p> dentro do dialog (para mostrar informações extras)
const myinfo = document.querySelector('#mydialog p')

// Adiciona um evento ao botão de fechar — quando clicado, o dialog fecha
myclose.addEventListener("click", () => mydialog.close())

/* 
   Também poderia ser escrito assim:
   myclose.addEventListener("click", () => {
       myclose.close();
   })
*/

// Função para exibir os templos na tela
function displayItems(data) { // 
    console.log(data) // Mostra o array inteiro no console (para debug)

    // Percorre cada item do array (cada templo)
    data.forEach(x => {
        console.log(x) // Mostra o templo atual no console

        // Cria um elemento de imagem <img>
        const photo = document.createElement('img')

        // Define a imagem com a URL do templo (juntando a base + o caminho da imagem)
        photo.src = `${url}${x.path}`

        // Define o texto alternativo com o nome do templo
        photo.alt = x.name

        photo.addEventListener('click', () => showStuff(x));

        // Adiciona essa imagem na div com id="showHere"
        showHere.appendChild(photo)
    }) //end loop
}// end function

// Chama a função passando o array de templos para que apareçam na tela
displayItems(temples)

function showStuff(x) {
    mytitle.innerHTML = x.name
    myinfo.innerHTML = `Dedicated ${x.dedicated} by ${x.person}`
    mydialog.showModal()
    
}

// Get the current year
const currentYear = new Date().getFullYear();

// Get the last modified date of the document
const lastModifiedDate = document.lastModified;

// Set footer info
const footerYear = document.getElementById('footer-year');
const lastModified = document.getElementById('last-modified');

footerYear.textContent = new Date().getFullYear();
    
// Set last modified date
lastModified.textContent = `Last Updated: ${document.lastModified}`;