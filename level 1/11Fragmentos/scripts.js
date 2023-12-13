// Definición de Palabras y Variables Globales:
const words = ["Victoria", "Programación", "Memoria", "Desarrollo", "JavaScript", "HTML", "CSS"];
    let currentWord;
    let timer;

    // Remueve la clase 'hidden' del contenedor de opciones
    function startGame() {
        document.getElementById('options-container').classList.remove('hidden');
        //document.getElementById('congratulations').classList.add('hidden');
        pickRandomWord();
        displayOptions();
         // Inicia un temporizador
        startTimer();
    }

    // Selecciona una palabra aleatoria del array words.
    // Muestra la palabra seleccionada en el elemento con id 'word-display'
    function pickRandomWord() {
        currentWord = words[Math.floor(Math.random() * words.length)];
        document.getElementById('word-display').textContent = currentWord;
    }

    // Baraja las palabras para presentarlas en orden aleatorio.
    function displayOptions() {
        const optionsContainer = document.getElementById('options-container');
        optionsContainer.innerHTML = "";

        // crea una copia de words y genera un numero aleatorio 
        const shuffledWords = [...words].sort(() => Math.random() - 0.5);
        // agrega las palabras al contenedor y agrega un evento click 
        shuffledWords.forEach(word => {
            const optionElement = document.createElement('div');
            optionElement.textContent = word;
            optionElement.classList.add('option');
            optionElement.addEventListener('click', () => checkAnswer(word, optionElement));
            optionsContainer.appendChild(optionElement);
        });
    }

    function checkAnswer(selectedWord, optionElement) {
        // Limpiar el temporizador actual para evitar ejecuciones múltiples
        clearTimeout(timer);
        // Verificar si la palabra seleccionada es correcta
        if (selectedWord === currentWord) {
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

    

    // Iniciar un temporizador que ejecutará el código dentro de la función después de 10 segundos
    function startTimer() {
        timer = setTimeout(() => {
            alert("Tiempo agotado. ¡Intenta de nuevo!");
            startGame();
        }, 5000); // Cambia este valor al tiempo deseado en milisegundos
    }
    

    // Inicia el juego cuando la página se carga
    window.onload = startGame;