const phrases = [
    "A palabras necias oídos sordos",
    "Haz el amor y no la guerra",
    "Camarón que se duerme se lo lleva la corriente",
    "Más vale prevenir que lamentar",
    "A buen entendedor pocas palabras bastan"
];
let currentPhrase;
let incompletePart;
let timer;

function startGame() {
    document.getElementById('options-container').classList.remove('hidden');
    //document.getElementById('congratulations').classList.add('hidden');
    pickRandomPhrase();
    
    displayOptions();
    // Inicia un temporizador
    startTimer();
}


// Elige aleatoriamente una frase y encuentra la primera mitad de la frase
function pickRandomPhrase() {
    currentPhrase = phrases[Math.floor(Math.random() * phrases.length)];
    incompletePart = getIncompletePart(currentPhrase);

    // muestra la primera mitad de la frase
    document.getElementById('phrase-display').textContent = currentPhrase.substring(0, currentPhrase.indexOf(incompletePart)).trim();
}

// Encuentra la mitad de la frase 
function getIncompletePart(phrase) {
    const words = phrase.split(' ');
    const incompleteIndex = Math.floor(words.length / 2);
    return words.slice(incompleteIndex).join(' ');
}
// muestra las opciones (la segunda mitad de otras frases) y la primera mitad de la frase en "phrase-display".
function displayOptions() {
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.textContent = "";

    // Obtén la segunda mitad de la frase sin repetirla
    const incompleteOptions = getIncompletePart(currentPhrase);

    // Shuffle the phrases to randomize the options
    const shuffledPhrases = [...phrases].filter(phrase => phrase !== currentPhrase).sort(() => Math.random() - 0.5);

    shuffledPhrases.forEach(phrase => {
        const optionElement = document.createElement('div');
        optionElement.textContent = getIncompletePart(phrase);
        optionElement.classList.add('option');
        optionElement.addEventListener('click', () => checkAnswer(phrase));
        optionsContainer.appendChild(optionElement);
    });

    // Agrega la opción correcta
    const correctOptionElement = document.createElement('div');
    correctOptionElement.textContent = incompleteOptions;
    correctOptionElement.classList.add('option');
    correctOptionElement.addEventListener('click', () => checkAnswer(currentPhrase, correctOptionElement));
    optionsContainer.appendChild(correctOptionElement);
}

function checkAnswer(selectedPhrase, optionElement) {
    // Limpiar el temporizador actual para evitar ejecuciones múltiples
    clearTimeout(timer);
    // Comparar la frase seleccionada con la frase actual
    if (selectedPhrase === currentPhrase) {
        optionElement.classList.add('correct');
    } else {
        optionElement.classList.add('incorrect');
    }
    // Después de un segundo, limpiar las clases y, opcionalmente, reiniciar el juego
    setTimeout(() => {
        optionElement.classList.remove('correct', 'incorrect');
        startGame();
    }, 1000);
   

        //document.getElementById('options-container').classList.add('hidden');
        //document.getElementById('congratulations').classList.remove('hidden');
    
}

function startTimer() {
    // Iniciar un temporizador que ejecutará el código dentro de la función después de 10 segundos
    timer = setTimeout(() => {
        alert("Tiempo agotado. ¡Intenta de nuevo!");
        startGame();
    }, 10000); // Cambia este valor al tiempo deseado en milisegundos
}

// Inicia el juego cuando la página se carga
window.onload = startGame;