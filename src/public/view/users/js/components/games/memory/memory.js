class MemoryGame {
    constructor() {
        this.gameElement = document.createElement('div');
        this.gameElement.innerHTML = this.getGameHtml();
        this.cartasViradas = [];
        this.cartasEncontradas = 0;
        this.init();
    }

    getGameHtml() {
        return `
        <link rel="stylesheet" href="../../../../../css/Games/memoryGame.css">
        <audio id="somAcerto" src="./sounds/acerto.mp3"></audio>
        <audio id="somErro" src="./sounds/erro.mp3"></audio>
        <div class="jogo">
            <div class="linha">
                <div class="card" data-card="abacate">
                    <img class="frente" src="../../../../../images/games/abacate.png">
                    <img class="verso" src="../../../../../images/games/verso2.png">
                </div>
                <div class="card" data-card="abacaxi">
                    <img class="frente" ssrc="../../../../../images/games/abacaxi.png">
                    <img class="verso" src="../../../../../images/games/verso2.png">
                </div>
                <div class="card" data-card="banana">
                    <img class="frente" src="../../../../../images/games/banana.png">
                    <img class="verso" src="../../../../../images/games/verso1.png">
                </div>
                <div class="card" data-card="cereja">
                    <img class="frente" src="../../../../../images/games/cereja.png">
                    <img class="verso" src="../../../../../images/games/verso1.png">
                </div>
            </div>
            <div class="linha">
                <div class="card" data-card="cereja">
                    <img class="frente" src="../../../../../images/games/cereja.png">
                    <img class="verso" src="../../../../../images/games/verso1.png">
                </div>
                <div class="card" data-card="banana">
                    <img class="frente" src="../../../../../images/games/banana.png">
                    <img class="verso" src="../../../../../images/games/verso1.png">
                </div>
                <div class="card" data-card="kiwi">
                    <img class="frente" src="../../../../../images/games/kiwi.png">
                    <img class="verso" src="../../../../../images/games/verso2.png">
                </div>
                <div class="card" data-card="abacate">
                    <img class="frente" src="../../../../../images/games/abacate.png">
                    <img class="verso" src="../../../../../images/games/verso2.png">
                </div>
            </div>
            <div class="linha">
                <div class="card" data-card="laranja">
                    <img class="frente" src="../../../../../images/games/laranja.png">
                    <img class="verso" src="../../../../../images/games/verso2.png">
                </div>
                <div class="card" data-card="melancia">
                    <img class="frente" src="../../../../../images/games/melancia.png">
                    <img class="verso" src="../../../../../images/games/verso1.png">
                </div>
                <div class="card" data-card="morango">
                    <img class="frente" src="../../../../../images/games/morango.png">
                    <img class="verso" src="../../../../../images/games/verso1.png">
                </div>
                <div class="card" data-card="morango">
                    <img class="frente" src="../../../../../images/games/morango.png">
                    <img class="verso" src="../../../../../images/games/verso1.png">
                </div>
            </div>
            <div class="linha">
                <div class="card" data-card="kiwi">
                    <img class="frente" src="../../../../../images/games/kiwi.png">
                    <img class="verso" src="../../../../../images/games/verso2.png">
                </div>
                <div class="card" data-card="abacaxi">
                    <img class="frente" src="../../../../../images/games/abacaxi.png">
                    <img class="verso" src="../../../../../images/games/verso2.png">
                </div>
                <div class="card" data-card="melancia">
                    <img class="frente" src="../../../../../images/games/melancia.png">
                    <img class="verso" src="../../../../../images/games/verso1.png">
                </div>
                <div class="card" data-card="laranja">
                    <img class="frente" src="../../../../../images/games/laranja.png">
                    <img class="verso" src="../../../../../images/games/verso2.png">
                </div>
            </div>
        </div>
        <div id="parabensModal" class="modal">
            <div class="modal-content">
                <span class="close">&times;</span>
                <p>Parabéns! Você acertou todas as cartas!</p>
                <button id="voltarHomeBtn">Voltar à Home</button>
                <button id="jogarNovamenteBtn">Jogar Novamente</button>
            </div>
        </div>
        `;
    }

    init() {
        this.embaralharCartas();
        this.setupListeners();
    }

    setupListeners() {
        const todasAsCartas = this.gameElement.querySelectorAll('.card');
        todasAsCartas.forEach((carta) => {
            carta.addEventListener('click', () => this.handleCardClick(carta));
        });
    }

    handleCardClick(carta) {
        if (!carta.classList.contains("encontrada") && !carta.classList.contains("flip") && this.cartasViradas.length < 2) {
            carta.classList.add("flip");
            this.cartasViradas.push(carta);
            this.checkForMatch();
        }
    }

    checkForMatch() {
        if (this.cartasViradas.length === 2) {
            const carta1 = this.cartasViradas[0].getAttribute("data-card");
            const carta2 = this.cartasViradas[1].getAttribute("data-card");
            if (carta1 === carta2) {
                this.cartasViradas.forEach(carta => carta.classList.add("encontrada"));
                this.cartasEncontradas += 2;
                this.cartasViradas = [];
                this.playCorrectWordSound();
                if (this.cartasEncontradas === this.gameElement.querySelectorAll('.card').length) {
                    setTimeout(() => {
                        this.showCongratulationsModal();
                        this.resetGame();
                    }, 500);
                }
            } else {
                setTimeout(() => {
                    this.cartasViradas.forEach(carta => carta.classList.remove("flip"));
                    this.cartasViradas = [];
                }, 1000);
            }
        }
    }

    playCorrectWordSound() {
        const audio = document.getElementById('somAcerto');
        audio.play();
    }

    showCongratulationsModal() {
        let modal = document.getElementById("parabensModal");
        modal.style.display = "block";
        document.body.classList.add("modal-open");
        let closeBtn = document.querySelector("#parabensModal .close");
        closeBtn.onclick = () => {
            modal.style.display = "none";
            document.body.classList.remove("modal-open");
        };
        document.getElementById("voltarHomeBtn").onclick = () => window.location.href = "/home";
        document.getElementById("jogarNovamenteBtn").onclick = () => {
            this.resetGame();
            modal.style.display = "none";
            document.body.classList.remove("modal-open");
        };
    }

    resetGame() {
        this.cartasEncontradas = 0;
        this.cartasViradas = [];
        this.embaralharCartas();
        const todasAsCartas = this.gameElement.querySelectorAll('.card');
        todasAsCartas.forEach(carta => {
            carta.classList.remove("encontrada", "flip");
        });
    }

    embaralharCartas() {
        const todasAsCartas = this.gameElement.querySelectorAll('.card');
        todasAsCartas.forEach(carta => {
            let randomPos = Math.floor(Math.random() * todasAsCartas.length);
            carta.style.order = randomPos;
        });
    }
}

function initializeMemoryGame() {
    const memoryGame = new MemoryGame();
    main.innerHTML = "";
    document.body.appendChild(memoryGame.gameElement);
    main.appendChild(memoryGame.gameElement);
}

export { initializeMemoryGame };