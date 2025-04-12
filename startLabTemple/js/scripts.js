// Seleciona o botão que abre o diálogo
const openButton1 = document.querySelector('#openButton1');
const openButton2 = document.querySelector('#openButton2');
const openButton3 = document.querySelector('#openButton3');

// Seleciona o elemento <dialog>
const dialogBox = document.querySelector('#dialogBox');
// Seleciona a <div> dentro do <dialog> para poder adicionar ou alterar o texto exibido no modal
const dialogBoxtext = document.querySelector('#dialogBox div');

// Seleciona o botão que fecha o diálogo
const closeButton = document.querySelector('#closeButton');

// addEventListener É um método que permite ouvir eventos (como cliques, teclas, envio de formulário etc.) e executar uma função quando esse evento acontece.
// 🔥 Eventos comuns:
// 'click'     → Quando o usuário clica em um elemento
// 'mouseover' → Quando o mouse passa por cima do elemento
// 'keydown'   → Quando uma tecla do teclado é pressionada
// 'submit'    → Quando um formulário é enviado
// 'input'     → Quando o valor de um campo de input muda
// Quando o botão "More Info" for clicado, mostra o diálogo como modal
openButton1.addEventListener("click", () => { //element.addEventListener('tipo-de-evento', função);
  dialogBox.showModal();
  dialogBoxtext.innerHTML = 'One Apple contains 95 calories' // Altera o conteúdo da <div> dentro do dialog, permitindo usar HTML ou texto

});
// Arrow function usada no evento de clique: () são os parâmetros, => indica que é uma função moderna
// Pode escrever assim: openButton2.addEventListener("click", function() {
openButton2.addEventListener("click", () => {
    dialogBox.showModal();
    dialogBoxtext.innerHTML = 'One Apple contains 45 calories'
});

openButton3.addEventListener("click", () => {
    dialogBox.showModal();
    dialogBoxtext.innerHTML = 'One Apple contains 105 calories'
});


// Quando o botão "Close" for clicado, fecha o diálogo
closeButton.addEventListener("click", () => {
  dialogBox.close();
});