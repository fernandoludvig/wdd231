// Define uma lista de jogadores com características específicas por posição
const players = [
    {
        id: 1,
        name: "Alex Johnson",
        position: "Forward",
        skill: "Advanced",
        gamesPlayed: 24,
        goalsScored: 18,
        assists: 5,
        bio: "Creative attacker with excellent finishing skills."
    },
    {
        id: 2,
        name: "Lucas Silva",
        position: "Midfielder",
        skill: "Intermediate",
        gamesPlayed: 18,
        assists: 12,
        goalsScored: 3,
        bio: "Strong playmaker with great passing accuracy."
    },
    {
        id: 3,
        name: "Daniel Oliveira",
        position: "Goalkeeper",
        skill: "Advanced",
        gamesPlayed: 32,
        goalsConceded: 21,
        cleanSheets: 10,
        bio: "Quick reflexes and solid leadership from the back."
    },
    {
        id: 4,
        name: "Mateo Rossi",
        position: "Defender",
        skill: "Beginner",
        gamesPlayed: 10,
        tackles: 23,
        interceptions: 15,
        bio: "Eager learner with strong tackling instincts."
    },
    {
        id: 5,
        name: "Sarah Kim",
        position: "Winger",
        skill: "Intermediate",
        gamesPlayed: 20,
        crossesCompleted: 15,
        dribblesCompleted: 28,
        bio: "Fast and agile, excellent in 1v1 situations."
    },
    {
        id: 6,
        name: "Carlos Mendes",
        position: "Striker",
        skill: "Advanced",
        gamesPlayed: 30,
        goalsScored: 25,
        shotsOnTarget: 42,
        bio: "Clinical finisher with powerful shooting."
    },
    {
        id: 7,
        name: "Emma Thompson",
        position: "Center Back",
        skill: "Intermediate",
        gamesPlayed: 22,
        tackles: 35,
        aerialDuelsWon: 28,
        bio: "Dominant in the air and strong in challenges."
    },
    {
        id: 8,
        name: "Rafael Santos",
        position: "Defensive Midfielder",
        skill: "Advanced",
        gamesPlayed: 28,
        passesCompleted: 320,
        interceptions: 40,
        bio: "Excellent positional awareness and passing range."
    },
    {
        id: 9,
        name: "Olivia Chen",
        position: "Attacking Midfielder",
        skill: "Advanced",
        gamesPlayed: 26,
        assists: 15,
        keyPasses: 38,
        bio: "Creative vision and precise through balls."
    },
    {
        id: 10,
        name: "Diego Lopez",
        position: "Full Back",
        skill: "Intermediate",
        gamesPlayed: 19,
        crossesCompleted: 12,
        tackles: 25,
        bio: "Energetic defender with good crossing ability."
    },
    {
        id: 11,
        name: "Sophie Martin",
        position: "Forward",
        skill: "Beginner",
        gamesPlayed: 8,
        goalsScored: 3,
        shotsOnTarget: 7,
        bio: "Developing striker with great potential."
    },
    {
        id: 12,
        name: "Thomas Müller",
        position: "Midfielder",
        skill: "Advanced",
        gamesPlayed: 35,
        assists: 18,
        goalsScored: 8,
        bio: "Versatile midfielder with excellent game intelligence."
    },
    {
        id: 13,
        name: "Isabella Costa",
        position: "Winger",
        skill: "Intermediate",
        gamesPlayed: 21,
        dribblesCompleted: 32,
        crossesCompleted: 18,
        bio: "Skilled dribbler with explosive pace."
    },
    {
        id: 14,
        name: "Mohamed Salah",
        position: "Forward",
        skill: "Advanced",
        gamesPlayed: 29,
        goalsScored: 22,
        assists: 9,
        bio: "World-class forward with exceptional finishing."
    },
    {
        id: 15,
        name: "Anna Kowalski",
        position: "Goalkeeper",
        skill: "Intermediate",
        gamesPlayed: 15,
        cleanSheets: 6,
        saves: 48,
        bio: "Reliable shot-stopper with good distribution."
    }
];

// Quando o conteúdo da página for totalmente carregado
document.addEventListener('DOMContentLoaded', () => {
    displayPlayers(players); // Exibe a lista inicial de jogadores

    // Pega os elementos do input e botão de busca
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');

    // Função para filtrar jogadores com base no termo de busca
    const searchPlayers = () => {
        const searchTerm = searchInput.value.toLowerCase(); // Termo de busca em minúsculas
        const filteredPlayers = players.filter(player =>
            player.name.toLowerCase().includes(searchTerm) || // Busca por nome
            player.position.toLowerCase().includes(searchTerm) || // Busca por posição
            player.skill.toLowerCase().includes(searchTerm) // Busca por habilidade
        );
        displayPlayers(filteredPlayers); // Exibe apenas os jogadores filtrados
    };

    // Quando o botão de busca for clicado
    searchButton.addEventListener('click', searchPlayers);

    // Também aciona a busca se o usuário pressionar "Enter"
    searchInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') searchPlayers();
    });
});

// Função para exibir os jogadores na tela
function displayPlayers(playersToDisplay) {
    const playersList = document.getElementById('players-list'); // Container onde os cards serão inseridos
    if (!playersList) return; // Se o elemento não existe, sai da função

    playersList.innerHTML = ''; // Limpa o conteúdo anterior

    // Mostra até 15 jogadores
    playersToDisplay.slice(0, 15).forEach(player => {
        let extraStat = ''; // Estatística adicional com base na posição

        // Define qual estatística será mostrada de acordo com a posição
        switch (player.position) {
            case 'Forward':
                extraStat = `<p><strong>Goals Scored:</strong> ${player.goalsScored}</p>`;
                break;
            case 'Midfielder':
                extraStat = `<p><strong>Assists:</strong> ${player.assists}</p>`;
                break;
            case 'Defender':
                extraStat = `<p><strong>Tackles:</strong> ${player.tackles}</p>`;
                break;
            case 'Goalkeeper':
                extraStat = `<p><strong>Goals Conceded:</strong> ${player.goalsConceded}</p>`;
                break;
            case 'Winger':
                extraStat = `<p><strong>Crosses Completed:</strong> ${player.crossesCompleted}</p>`;
                break;
        }

        // Cria um card HTML com as informações do jogador
        const playerCard = document.createElement('div');
        playerCard.className = 'card'; // Classe para estilização
        playerCard.innerHTML = `
            <div class="card-content">
                <h3>${player.name}</h3>
                <p><strong>Position:</strong> ${player.position}</p>
                <p><strong>Skill Level:</strong> ${player.skill}</p>
                <p><strong>Games Played:</strong> ${player.gamesPlayed}</p>
                ${extraStat} <!-- Insere a estatística específica -->
                <p>${player.bio}</p>
            </div>
        `;
        playersList.appendChild(playerCard); // Adiciona o card ao container
    });
}
