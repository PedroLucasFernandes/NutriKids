class CrosswordGameFruits {
    constructor() {
        this.gameElement = document.createElement('div');
        this.gameElement.innerHTML = this.getGameHtml();
        this.correctSound = new Audio('../../sounds/acertoCruzada.mp4');
        this.puzzleGrid = [
            [' ', ' ', ' ', ' ', '1', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', '2', 'm', 'e', 'l', 'a', 'o', ' '],
            [' ', ' ', ' ', ' ', 'e', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', 'l', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', '3', 'b', 'a', 'n', 'a', 'n', 'a', ' '],
            [' ', ' ', ' ', ' ', 'n', ' ', ' ', ' ', ' ', ' '],
            ['4', 'a', 'b', 'a', 'c', 'a', 'x', 'i', ' ', ' '],
            [' ', ' ', ' ', ' ', 'i', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', '5', 'l', 'a', 'r', 'a', 'n', 'j', 'a']
        ];
        this.clues = {
            '1': '1 - Fruta suculenta, doce e refrescante, com 95% de água',
            '2': '2 - Sou amarelo vibrante, uma fruta refrescante',
            '3': '3 - Alimento preferido dos macacos',
            '4': '4 - Rainha das frutas, por usar uma coroa',
            '5': '5 - Fruta rica em vitamina C'
        };
        this.init();
    }

    getGameHtml() {
        return `
        <link rel="stylesheet" href="../../../../../css/Games/crossWord.css">
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">
        <div id="tituloJogo">Palavra Cruzada</div>
        <div id="puzzle-wrapper">
            <div id="puzzle-container"></div>
            <div id="clues"></div>
        </div>
        <div id="message"></div>
        <div id="parabensModal" class="modal">
            <div class="modal-content">
                <span class="close">&times;</span>
                <p>Parabéns! Você acertou todas as palavras!</p>
                <button id="voltarHomeBtn">Voltar à Home</button>
                <button id="jogarNovamenteBtn">Jogar Novamente</button>
            </div>
        </div>
        `;
    }

    init() {
        this.createPuzzle();
        this.setupListeners();
    }

    createPuzzle() {
        const puzzleContainer = this.gameElement.querySelector('#puzzle-container');
        const cluesDiv = this.gameElement.querySelector('#clues');

        this.puzzleGrid.forEach((row, i) => {
            row.forEach((cell, j) => {
                const square = document.createElement('div');
                square.classList.add('square');
                if (cell === ' ') {
                    square.classList.add('empty');
                } else if (!isNaN(parseInt(cell))) {
                    square.classList.add('number');
                    square.textContent = cell;
                } else {
                    square.dataset.letter = cell;
                    square.contentEditable = true;
                    square.addEventListener('input', this.checkWord.bind(this));
                }
                puzzleContainer.appendChild(square);
            });
        });

        const cluesContainer = document.createElement('div');
        cluesContainer.classList.add('clues-container');
        Object.values(this.clues).forEach(clue => {
            const clueDiv = document.createElement('div');
            clueDiv.textContent = clue;
            cluesContainer.appendChild(clueDiv);
        });
        cluesDiv.appendChild(cluesContainer);
    }

    checkWord(event) {
        const square = event.target;

        if (square.innerText.length > 1) {
            square.innerText = square.innerText[0];
        }

        const input = square.innerText.trim();
        const correctLetter = square.dataset.letter.trim();
        if (input.toLowerCase() === correctLetter.toLowerCase()) {
            square.style.backgroundColor = 'lightgreen';
            this.correctSound.play();
            this.markCorrectWord(this.getWord(square));
        } else {
            square.style.backgroundColor = '#ff9688';
        }
    }

    getWord(square) {
        let word = '';
        let col = Array.from(square.parentNode.children).indexOf(square) % 10;
        let row = Math.floor(Array.from(square.parentNode.children).indexOf(square) / 10);

        let currentSquare = square;
        while (currentSquare && currentSquare.dataset.letter) {
            word = currentSquare.dataset.letter + word;
            col--;
            currentSquare = col >= 0 ? square.parentNode.children[row * 10 + col] : null;
        }

        col = Array.from(square.parentNode.children).indexOf(square) % 10 + 1;
        currentSquare = square.parentNode.children[row * 10 + col];
        while (currentSquare && currentSquare.dataset.letter) {
            word += currentSquare.dataset.letter;
            col++;
            currentSquare = col < 10 ? square.parentNode.children[row * 10 + col] : null;
        }

        return word;
    }

    markCorrectWord() {
        const squares = this.gameElement.querySelectorAll('.square');
        let allCorrect = true;
    
        squares.forEach(square => {
            if (square.dataset.letter && square.textContent.trim().toLowerCase() !== square.dataset.letter.toLowerCase()) {
                allCorrect = false;
                return;
            }
        });
    
        if (allCorrect) {
            this.exibirModalParabens();
        }
    }
    

    countWords() {
        return Object.keys(this.clues).length;
    }

    exibirModalParabens() {
        const modal = this.gameElement.querySelector("#parabensModal");
        modal.style.display = "block";
    }

    setupListeners() {
        const closeBtn = this.gameElement.querySelector("#parabensModal .close");
        closeBtn.addEventListener("click", () => {
            const modal = this.gameElement.querySelector("#parabensModal");
            modal.style.display = "none";
        });
    
        const voltarHomeBtn = this.gameElement.querySelector("#voltarHomeBtn");
        voltarHomeBtn.addEventListener("click", () => {
            window.location.href = "/Inicio";
        });
    
        const jogarNovamenteBtn = this.gameElement.querySelector("#jogarNovamenteBtn");
        jogarNovamenteBtn.addEventListener("click", () => {
            this.reiniciarJogo();
            const modal = this.gameElement.querySelector("#parabensModal");
            modal.style.display = "none";
        });
    }

    reiniciarJogo() {
        const squares = this.gameElement.querySelectorAll('.square');
        squares.forEach(square => {
            square.classList.remove('correct');
            square.style.backgroundColor = '';
            if (square.contentEditable === "true") {
                square.textContent = '';
            }
        });
        this.exibirModalParabens();
    }
}

function initializeGameCrosswordFruits() {
    const main = document.getElementById('main');
    main.innerHTML = "";
    const crosswordGameFruits = new CrosswordGameFruits();
    main.appendChild(crosswordGameFruits.gameElement);
}

export { initializeGameCrosswordFruits };