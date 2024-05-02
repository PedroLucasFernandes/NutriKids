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
    const divMain = document.createElement('div')
    const img = document.createElement('img');
    const h3 = document.createElement('h3');
    const div = document.createElement('div');
    const divDestaque = document.createElement('div');
    const esquerdaH3 = document.createElement('h3');
    const direitaH3 = document.createElement('h3');
    const btnVerMais = document.createElement('button');

    img.src = "./images/cereja1.png";

    h3.innerHTML = "Jogos em destaques:";

    div.classList.add("destaques");
    divDestaque.classList.add("conjunto");

    //Quadrado das palavras cruzadas
    const quadrado1 = document.createElement('div');
    quadrado1.classList.add("quadrado");
    quadrado1.addEventListener('click', initializeRandomCrossword);
    div.appendChild(quadrado1);

    //Quadrado do jogo da memória
    const quadrado2 = document.createElement('div');
    quadrado2.classList.add("quadrado");
    quadrado2.addEventListener('click', initializeMemoryGame);
    div.appendChild(quadrado2);

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