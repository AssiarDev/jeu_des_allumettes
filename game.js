// Initialisation du jeu
let allumettes = 50; 
let currentPlayer = 1;
let nbrPlayer;

// Récuperer les élèments
const displayAllumettes = document.getElementById('nbr-allumettes');
const displayPlayer = document.getElementById('displayPlayer')
const inputValue = document.getElementById('number');
const player = document.getElementById('player');
const tryAgain = document.getElementById('try');
const number = Number(inputValue.value);
const loose = document.getElementById('défaite');
const ask = document.querySelector('.ask');
let askPlayer = Number(ask.value)
const askInput = document.getElementById('ask-Player');

// fonction pour afficher les allumettes
const displayGame = () => {
    displayAllumettes.textContent = `Il y a ${allumettes} allumettes`;
    displayPlayer.textContent = 'Choisissez vous êtes combien la ?? (2-4)'
};

// Multijoueur
const howMuchPlayer = () =>{
    askPlayer = Number(ask.value);
    if (askPlayer < 2 || askPlayer > 4){
        askInput.textContent = `Veuillez entrer le nombre de joueur (2-4) : ${askPlayer}`;
    } else {
        nbrPlayer = askPlayer;
        displayPlayer.textContent = ''
        askInput.textContent = `Vous êtes : ${askPlayer} joueur`;
        inputValue.value = '';
        startGame();
    }
};

// Demander à l'utilisateur de retirer les allumettes
const removeAllumette = (userEntry) => {

    // Récupérer la valeur de l'input
    const number = Number(inputValue.value);
    userEntry = number;

    // Le joueur peut retirer entre 1 et 6 allumettes
        if (userEntry < 1 || userEntry > 6){
            tryAgain.textContent = `Joueur ${currentPlayer}, veuillez retirer entre 1 et 6 allumettes`;
        } else {
            allumettes -= userEntry
            displayGame();
            tryAgain.textContent = '';

        // vérifier que le joueur actuel a perdu
        if(allumettes <= 0){
            loose.textContent = `Oh non joueur ${currentPlayer}, tu as retirer la dernière allumettes.`;
            restartGame()
        } else {
            round()
        }

    }
    inputValue.value = ''
    inputValue.focus();
};

// Gestion tour des joueurs
const round = () => {
    currentPlayer = currentPlayer === nbrPlayer ? 1 : currentPlayer + 1;
    player.textContent = `Joueur ${currentPlayer}, a vous de jouer.`;
}


// Récupérer le bouton 
const button = document.getElementById('submit');

const handleSubmit = () => {
    if(nbrPlayer === undefined){
        howMuchPlayer()
    } else {
        removeAllumette()
    }
};

const handleSubmitKeydown = (e) => {
    if (e.key === 'Enter'){
        handleSubmit()
    }
};

button.addEventListener('click', handleSubmit);
inputValue.addEventListener('keydown', handleSubmitKeydown);

const startGame = () => {
    displayGame(); 
    player.textContent = `Joueur ${currentPlayer}, a vous de jouer.`;
};

const restartGame = () => {
    allumettes = 50;
    currentPlayer = 1;
    nbrPlayer = undefined
    inputValue.textContent = '';
    displayPlayer.textContent = 'Choississez vous êtes combien la ?? (2-4)';
    player.textContent = '';
    askInput.textContent = '';
    tryAgain.textContent = '';
    loose.textContent = '';
    howMuchPlayer()
}

displayGame();