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
        <link rel="stylesheet" href="styles.css">
        <audio id="somAcerto" src="./sounds/acerto.mp3"></audio>
        <audio id="somErro" src="./sounds/erro.mp3"></audio>
        <div class="jogo">
            <div class="linha">
                <div class="card" data-card="abacate">
                    <img class="frente" src="./images/abacate.png">
                    <img class="verso" src="./images/verso2.png">
                </div>
                <div class="card" data-card="abacaxi">
                    <img class="frente" src="./images/abacaxi.png">
                    <img class="verso" src="./images/verso2.png">
                </div>
                <div class="card" data-card="banana">
                    <img class="frente" src="./images/banana.png">
                    <img class="verso" src="./images/verso1.png">
                </div>
                <div class="card" data-card="cereja">
                    <img class="frente" src="./images/cereja.png">
                    <img class="verso" src="./images/verso1.png">
                </div>
            </div>
            <div class="linha">
                <div class="card" data-card="cereja">
                    <img class="frente" src="./images/cereja.png">
                    <img class="verso" src="./images/verso1.png">
                </div>
                <div class="card" data-card="banana">
                    <img class="frente" src="./images/banana.png">
                    <img class="verso" src="./images/verso1.png">
                </div>
                <div class="card" data-card="kiwi">
                    <img class="frente" src="./images/kiwi.png">
                    <img class="verso" src="./images/verso2.png">
                </div>
                <div class="card" data-card="abacate">
                    <img class="frente" src="./images/abacate.png">
                    <img class="verso" src="./images/verso2.png">
                </div>
            </div>
            <div class="linha">
                <div class="card" data-card="laranja">
                    <img class="frente" src="./images/laranja.png">
                    <img class="verso" src="./images/verso2.png">
                </div>
                <div class="card" data-card="melancia">
                    <img class="frente" src="./images/melancia.png">
                    <img class="verso" src="./images/verso1.png">
                </div>
                <div class="card" data-card="morango">
                    <img class="frente" src="./images/morango.png">
                    <img class="verso" src="./images/verso1.png">
                </div>
                <div class="card" data-card="morango">
                    <img class="frente" src="./images/morango.png">
                    <img class="verso" src="./images/verso1.png">
                </div>
            </div>
            <div class="linha">
                <div class="card" data-card="kiwi">
                    <img class="frente" src="./images/kiwi.png">
                    <img class="verso" src="./images/verso2.png">
                </div>
                <div class="card" data-card="abacaxi">
                    <img class="frente" src="./images/abacaxi.png">
                    <img class="verso" src="./images/verso2.png">
                </div>
                <div class="card" data-card="melancia">
                    <img class="frente" src="./images/melancia.png">
                    <img class="verso" src="./images/verso1.png">
                </div>
                <div class="card" data-card="laranja">
                    <img class="frente" src="./images/laranja.png">
                    <img class="verso" src="./images/verso2.png">
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
            carta.addEventListener('click', this.handleCardClick.bind(this, carta));
        });
    }

    handleCardClick(carta) {
        if (!carta.classList.contains("encontrada") && this.cartasViradas.length < 2) {
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
        document.getElementById("voltarHomeBtn").onclick = () => window.location.href = "index.html";
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

export default MemoryGame;
