const questionsArray = ['DRACO', 'FENIX', 'UNICORNIO', 'CRUX DEL SUR', 'ORION', 'PEGASUS', 'BALAM', 'LEO', 'AQUILA', 'BATZ', 'CAMALEON', 'PICIS', 'TAURUS', 'URSUS', 'KEH', 'SCUTUM', 'CISNE', 'ANDROMEDA', 'CENTAURUS', 'SCORPIUS', 'LOBO', 'TORTUGA', 'MOAN', 'TRIANGULUM', 'GRULLA'];
const answersArray = ['DRAKE', 'FLAMITO', 'CHUBY','CRUXITO', 'REGIL', 'RAS', 'KAWI', 'LEONARDO', 'CHAHIM', 'WIRIK', 'DUF', 'SONRI Y SUEÑOS', 'TORIVIO', 'NURU','VENADIN','QINICH','WHIP','GUGU','KENTAURY','BAXTER','LUPIN','TUGUI','TLAMATI','SIMBA','GROS'];

document.addEventListener('DOMContentLoaded', () => {
    const memoryGameContainer = document.getElementById('memory-game');
    const scoreElement = document.getElementById('score');
    let pairsFound = 0;
    let flippedCards = [];
    let lockBoard = false;

    // Seleccionar aleatoriamente 5 preguntas y sus respuestas
    const selectedIndices = [];
    while (selectedIndices.length < 5) {
        const randomIndex = Math.floor(Math.random() * questionsArray.length);
        if (!selectedIndices.includes(randomIndex)) {
            selectedIndices.push(randomIndex);
        }
    }

    const selectedQuestions = selectedIndices.map(index => questionsArray[index]);
    const selectedAnswers = selectedIndices.map(index => answersArray[index]);

    // Crear un array combinado de preguntas y respuestas
    const combinedArray = [...selectedQuestions, ...selectedAnswers];
    const shuffledArray = combinedArray
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);

    // Crear tarjetas
    shuffledArray.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.dataset.value = item;
        card.dataset.index = index;
        card.textContent = '?';
        memoryGameContainer.appendChild(card);

        card.addEventListener('click', () => {
            if (lockBoard || card.classList.contains('flipped')) return;

            card.classList.add('flipped');
            card.textContent = item;
            flippedCards.push(card);

            if (flippedCards.length === 2) {
                lockBoard = true;
                setTimeout(checkForMatch, 1000);
            }
        });
    });

    function checkForMatch() {
        const [card1, card2] = flippedCards;
        const isMatch = (selectedQuestions.includes(card1.dataset.value) && selectedAnswers.includes(card2.dataset.value) && selectedQuestions.indexOf(card1.dataset.value) === selectedAnswers.indexOf(card2.dataset.value)) ||
                        (selectedAnswers.includes(card1.dataset.value) && selectedQuestions.includes(card2.dataset.value) && selectedAnswers.indexOf(card1.dataset.value) === selectedQuestions.indexOf(card2.dataset.value));

        if (isMatch) {
            card1.classList.add('correct');
            card2.classList.add('correct');
            pairsFound++;
            scoreElement.textContent = `Parejas encontradas: ${pairsFound}`;
            if (pairsFound === selectedQuestions.length) {
                setTimeout(() => {
                    alert('¡Felicidades! Has completado el juego.');
                }, 500);
            }
        } else {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            card1.textContent = '?';
            card2.textContent = '?';
        }

        flippedCards = [];
        lockBoard = false;
    }
});
