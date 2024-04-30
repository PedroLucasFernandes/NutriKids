class GraphicGame2 {
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
        <link rel="stylesheet" href="../styles.css">
        <link rel="preconnect" href="https://fonts.gstatic.com">
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap" rel="stylesheet">
        <div id="elementNames" class="element-names">
            <div class="dicas">
                <h2>Dicas</h2>
            </div>
        </div>
        <div class="container">
            <img src="../images/prato1.png" usemap="#imagemMapa" alt="Prato de Comida" id="imagemPrato">
            <map name="imagemMapa">
            <area shape="poly" coords="178,169,199,163,213,149,223,123,218,106,206,87,189,75,171,73,151,79,138,92,132,109,129,133,140,154,159,166" data-nome="Arroz">               
            <area shape="poly" coords="153,258,165,242,167,226,172,217,180,208,180,191,166,173,148,168,136,155,127,144,111,133,93,142,84,155,87,176,92,195,87,220,97,225,108,238,123,254,134,258" data-nome="Feijão">
            <area shape="poly" coords="220,138,233,147,248,139,254,147,267,146,286,145,299,135,312,127,314,113,328,108,328,92,324,72,323,56,324,45,308,54,293,51,281,47,269,36,262,28,250,24,232,28,220,19,207,23,194,30,178,38,171,43,162,56,142,63,139,76,158,71,175,69,188,72,198,79,209,87,219,101,222,114" data-nome="Salada">
            <area shape="poly" coords="316,117,329,106,352,100,354,114,363,117,369,131,362,141,366,157,364,172,360,190,355,204,349,220,336,233,324,235,316,233,306,218,312,201,299,199,288,204,278,194,278,183,278,170,272,158,288,147,301,134" data-nome="Batata">
            <area shape="poly" coords="183,192,191,182,206,178,222,164,237,160,259,156,270,160,278,173,288,186,297,194,306,209,314,223,315,243,313,255,300,264,294,277,284,287,266,284,245,281,235,285,218,293,205,286,181,280,168,270,151,263,161,249,166,235,170,221,178,202" data-nome="Carne">
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
        let elementNames = ["Arroz", "Feijão", "Salada", "Batata", "Carne"];

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

export default GraphicGame2;
