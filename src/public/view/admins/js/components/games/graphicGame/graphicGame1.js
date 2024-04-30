class GraphicGame1 {
    constructor() {
        this.gameElement = document.createElement('div');
        this.gameElement.innerHTML = this.getGameHtml();
        this.elementosAcertados = 0;
        this.totalElementos = this.gameElement.querySelectorAll('area').length;
        this.alertaExibido = false;
        this.init();
    }

    getGameHtml() {
        return `
        <link rel="stylesheet" href="../../../../../css/Games/graphicGame1.css">
        <link rel="preconnect" href="https://fonts.gstatic.com">
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap" rel="stylesheet">
        <div id="elementNames" class="element-names">
            <div class="dicas">
                <h2>Dicas</h2>
            </div>
        </div>
        <div class="container">
            <img src="../../../../../images/games/prato1.png" usemap="#imagemMapa" alt="Prato de Comida" id="imagemPrato">
            <map name="imagemMapa">
            <area shape="poly"
                coords="183,193,164,213,145,232,136,244,117,254,108,258,99,241,82,236,76,220,66,202,63,188,72,177,65,168,73,160,73,149,79,141,75,125,81,105,89,98,97,89,117,89,129,91,136,101,144,111,144,122,144,137,151,147,157,161,166,164,181,170,186,180"
                data-nome="Carnes">
            <area shape="poly"
                coords="185,165,170,165,156,153,150,141,142,122,146,113,133,103,129,85,136,73,151,64,164,61,178,63,195,62,209,63,229,63,243,66,258,73,266,82,280,92,284,104,290,116,289,131,289,145,285,155,265,153,247,158,233,166,224,153,213,137,199,137,189,149"
                data-nome="Legumes">
            <area shape="poly"
                coords="105,261,119,254,135,246,136,228,152,219,162,223,166,213,174,204,185,195,193,182,181,168,189,156,198,143,207,143,218,152,225,160,232,167,241,155,256,154,269,156,285,156,287,169,289,185,289,198,288,211,291,230,281,240,277,253,261,257,254,266,243,276,231,282,220,286,205,293,191,293,171,293,153,291,134,280,117,270"
                data-nome="Arroz">
        </map>
        </div>
        <div id="popup" class="popup">
            <div class="popup-content" id="feedbackPopup">
                <span class="close" onclick="this.fecharPopup()">&times;</span>
                <h2>Digite o Nome do Alimento:</h2>
                <input type="text" id="nomeElemento" autocomplete="off">
                <button onclick="this.verificarResposta()">Verificar</button>
                <div id="respostaFeedback"></div>
            </div>
        </div>
        <div id="parabensModal" class="modal">
            <div class="modal-content">
                <span class="close" onclick="this.fecharModalParabens()">&times;</span>
                <p>Parabéns! Você acertou todos os elementos do prato!</p>
                <button id="voltarHomeBtn" onclick="window.location.href='index.html'">Voltar à Home</button>
                <button id="jogarNovamenteBtn" onclick="this.reiniciarJogo()">Jogar Novamente</button>
            </div>
        </div>
        `;
    }

    init() {
        this.setupListeners();
        this.exibirNomesElementos();
        this.adicionarHoverECursor();
    }

    setupListeners() {
        const areas = this.gameElement.querySelectorAll('area');
        areas.forEach(area => {
            area.addEventListener('click', this.abrirPopup.bind(this, area));
        });
    }

    exibirNomesElementos() {
        let elementNamesContainer = this.gameElement.querySelector("#elementNames");
        let elementNames = ["Arroz", "Carnes", "Legumes"];

        elementNames.forEach(name => {
            let div = document.createElement('div');
            div.classList.add('element-category');
            div.innerHTML = `<h3>${name}</h3>`;
            elementNamesContainer.appendChild(div);
        });
    }

    abrirPopup(area) {
        const popup = this.gameElement.querySelector("#popup");
        const inputElement = this.gameElement.querySelector("#nomeElemento");
        const respostaFeedback = this.gameElement.querySelector("#respostaFeedback");

        popup.style.display = "block";
        inputElement.value = "";
        respostaFeedback.innerHTML = "";
        inputElement.setAttribute("data-elemento", area.dataset.nome);
    }

    fecharPopup() {
        const popup = this.gameElement.querySelector("#popup");
        popup.style.display = "none";
    }

    verificarResposta() {
        const inputElement = this.gameElement.querySelector("#nomeElemento");
        const resposta = inputElement.value.trim();
        const elemento = inputElement.getAttribute("data-elemento");
        const respostaFeedback = this.gameElement.querySelector("#respostaFeedback");
        const popupContent = this.gameElement.querySelector("#feedbackPopup");

        if (resposta.toLowerCase() === elemento.toLowerCase()) {
            respostaFeedback.innerText = "Resposta correta!";
            popupContent.style.backgroundColor = "#9FCBA8";
            this.elementosAcertados++;
            if (this.elementosAcertados === this.totalElementos) {
                this.exibirModalParabens();
            }
        } else {
            respostaFeedback.innerText = "Resposta incorreta!";
            popupContent.style.backgroundColor = "#FF6666";
        }
    }

    exibirModalParabens() {
        const modal = this.gameElement.querySelector("#parabensModal");
        modal.style.display = "block";
    }

    fecharModalParabens() {
        const modal = this.gameElement.querySelector("#parabensModal");
        modal.style.display = "none";
    }

    reiniciarJogo() {
        const modal = this.gameElement.querySelector("#parabensModal");
        modal.style.display = "none";
        this.elementosAcertados = 0;
        this.alertaExibido = false;
    }

    adicionarHoverECursor() {
        const areas = this.gameElement.querySelectorAll('area');
        areas.forEach(area => {
            area.style.cursor = 'pointer';
        });
    }
}

export default GraphicGame1;
