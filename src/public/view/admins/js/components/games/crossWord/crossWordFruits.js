class CrosswordGameFruits {
    constructor() {
        this.gameElement = document.createElement('div');
        this.gameElement.innerHTML = this.getGameHtml();
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
            '1': '1 - Uma fruta grande, verde por fora e vermelha por dentro, com sementes pretas',
            '2': '2 - Parece com uma melancia, mas é amarelo por dentro e tem uma casca mais clara',
            '3': '3 - Uma fruta amarela que parece um sorriso',
            '4': '4 - Tem uma cor amarela bonita e uma coroa verde no topo',
            '5': '5 - Uma fruta redonda que é cheia de suco'
        };
        this.init();
    }

    getGameHtml() {
        return `
        <link rel="stylesheet" href="../styles.css">
        <link rel="preconnect" href="https://fonts.gstatic.com">
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;700&display=swap" rel="stylesheet">
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
        const input = square.innerText.trim();
        const correctLetter = square.dataset.letter.trim();
        if (input.toLowerCase() === correctLetter.toLowerCase()) {
            square.style.backgroundColor = 'lightgreen';
            this.markCorrectWord(this.getWord(square));
        } else {
            square.style.backgroundColor = '#ff9688';
        }
    }

    getWord(square) {
        let word = '';
        let col = Array.from(square.parentNode.children).indexOf(square) % 10;
        let row = Math.floor(Array.from(square.parentNode.children).indexOf(square) / 10);

        // Left to right
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

    markCorrectWord(word) {
        const squares = this.gameElement.querySelectorAll('.square');
        squares.forEach(square => {
            if (this.getWord(square) === word && square.textContent.trim() === square.dataset.letter) {
                square.classList.add('correct');
            }
        });

        if (this.gameElement.querySelectorAll('.correct').length === this.countWords()) {
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
            window.location.href = "index.html";
        });

        const jogarNovamenteBtn = this.gameElement.querySelector("#jogarNovamenteBtn");
        jogarNovamenteBtn.addEventListener("click", () => {
            this.reiniciarJogo();
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

export default CrosswordGameFruits;
