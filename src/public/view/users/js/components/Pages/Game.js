import header from "../header/header.js";
import footer from "../footer/footer.js";
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



export default function jogos() {
    const root = document.getElementById('root');
    root.innerHTML = "";
    const test = document.getElementById('css');
    test.href = "../../../../../css/User/Secao.css";

    const main = document.createElement('main');
    const img = document.createElement('img');
    const div = document.createElement('div');
    const h3 = document.createElement('h3');
    const divBox = document.createElement('div');

    img.src = "./images/cereja3.png";
    h3.innerHTML = "Jogos:";
    divBox.id = "box";
    main.id = "main";
    div.id = "container";



    const menu = ["Inicio", "Jogos", "Quizzes", "Receitas"];

    getGame()

    div.appendChild(h3);
    div.appendChild(divBox);
    main.appendChild(img);
    main.appendChild(div);

    root.appendChild(header(menu));
    root.appendChild(main);
    root.appendChild(footer());
}

const games = {
    "Palavras Cruzadas":initializeRandomCrossword,
    "Jogo da Memória":initializeMemoryGame
}

function renderGame(jogo) {
    changeCSS(jogo);
    games[jogo]();
}

async function getGame() {
    try {
        const apiUrl = window.location.hostname === 'alpha01.alphaedtech.org.br'
               ? 'https://alpha01.alphaedtech.org.br'
               : 'http://localhost:3000';
        
        const response = await fetch(`${apiUrl}/api/game/`);

        if (!response.status) {
            throw new Error('Erro na requisição');
        }

        const data = await response.json();
        console.log(data);

        return render(data);
    }
    catch (error) {
        console.error(`Erro na requisição: ${error}`);
    }
}

function render(data) {
    const sla = document.getElementById('box');

    for (const item of data) {
        const div = document.createElement("div");
        div.classList.add("box")

        const title = document.createElement("h3");
        const img = document.createElement("img");

        console.log(data);
        console.log(item.title);
        title.innerHTML = item.title;
        img.src = `./uploads/${item.image_path}`;

        div.addEventListener('click', function () {
            console.log(data.title)
            renderGame(item.title)
        });

        div.appendChild(title);
        div.appendChild(img);

        sla.appendChild(div);
    }
}

function changeCSS(game) {
    let css = ""
    if (game === "Jogo da Memória"){
        css = "memoryGame"
    }
    else {
        css = "crossWord"
    }
    const cssLink = document.getElementById('css');
    cssLink.href = `../../../../../css/Games/${css}.css`;
}