import { initializeGameCrosswordFoods } from "../games/crossword/crosswordFoods.js";
import { initializeGameCrosswordFruits } from "../games/crossword/crosswordFruits.js";
import { initializeGameCrosswordVegetables } from "../games/crossword/crosswordVegetables.js";
import { initializeMemoryGame } from "../games/memory/memoryGame.js";

function initializeRandomCrossword() {
    const crosswords = [initializeGameCrosswordFoods, initializeGameCrosswordFruits, initializeGameCrosswordVegetables];
    const randomIndex = Math.floor(Math.random() * crosswords.length);
    const SelectedCrosswordGame = crosswords[randomIndex]

    const main = document.getElementById('main');
    main.innerHTML = "";
    const crossWordGame = new SelectedCrosswordGame();
    main.appendChild(crossWordGame.gameElement);
}

const games = {
    "Palavras Cruzadas":initializeRandomCrossword,
    "Jogo da Memória":initializeMemoryGame
}

export default function jogos() {
    const divMain = document.createElement('div')
    const img = document.createElement('img');
    const h3 = document.createElement('h3');
    const div = document.createElement('div');
    const divDestaque = document.createElement('div');
    const btnVerMais = document.createElement('button');

    img.src = "./images/cereja1.png";

    h3.innerHTML = "Jogos em destaque:";


    div.classList.add("destaques");
    divDestaque.classList.add("conjunto");
    div.id = "cerejaDupla"

    for (let i = 0; i < 2; i++) {
        getGame(i)
    }

    btnVerMais.innerHTML = "Ver mais!";

    divMain.classList.add("secao1");

    divDestaque.appendChild(h3);
    divDestaque.appendChild(div);
    divDestaque.appendChild(btnVerMais);

    divMain.appendChild(img);
    divMain.appendChild(divDestaque);

    btnVerMais.addEventListener("click", () => {
        const event = new CustomEvent("pageChange", { detail: "/Jogos" });
        const main = document.querySelector("main");

        main.innerHTML = "";

        window.dispatchEvent(event);
    });

    return divMain;
}

async function getGame(id) {
    try {
        const apiUrl = window.location.hostname === 'alpha01.alphaedtech.org.br'
               ? 'https://alpha01.alphaedtech.org.br'
               : 'http://localhost:3000';
        
        const response = await fetch(`${apiUrl}/api/game/`);

        if (!response.status) {
            throw new Error('Erro na requisição');
        }

        const data = await response.json();
        console.log(data[id]);

        render(data[id]);
    }
    catch (error) {
        console.error(`Erro na requisição: ${error}`);
    }
}

function renderGame(jogo) {
    games[jogo]()
}

async function render(data) {
    console.log(data);

    const divtest = document.getElementById('cerejaDupla');

    const div = document.createElement("div");
    div.classList.add("box");

    const title = document.createElement("h3");
    const img = document.createElement("img");

    console.log(data);
    console.log(data.title);
    title.innerHTML = data.title;
    img.src = `./uploads/${data.image_path}`;

    div.addEventListener('click', function(){
        renderGame(data.title)
    });

    div.appendChild(title);
    div.appendChild(img);

    divtest.appendChild(div)

}