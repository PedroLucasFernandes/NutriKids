import header from "../header/header.js";
import footer from "../footer/footer.js";
import { initializeGame as initializeGameCrossWordFruits } from '../../../../admins/js/components/games/crossWord/crossWordFruits.js';
import { initializeGame as initializeGameCrossWordFoods } from '../../../../admins/js/components/games/crossWord/crossWordFoods.js';
import { initializeGame as initializeGameCrossWordVegetables } from '../../../../admins/js/components/games/crossWord/crossWordVegetables.js';
import { initializeGame as initializeGameMemory } from '../../../../admins/js/components/games/memoryGame/memoryGame.js';
import { initializeGame as initializeGameGraphicGame1 } from '../../../../admins/js/components/games/graphicGame/graphicGame1.js';
import { initializeGame as initializeGameGraphicGame2 } from '../../../../admins/js/components/games/graphicGame/graphicGame2.js';


export default function Game() {
    const root = document.getElementById('root');
    root.innerHTML = "";
    const test = document.getElementById('css');
    test.href = "../../../../../css/User/Secao.css";

    const main = document.createElement('main');
    const img = document.createElement('img');
    const div = document.createElement('div');
    const divBox = document.createElement('div');
    const h3 = document.createElement('h3');

    img.src = "./images/cereja2.png";
    h3.innerHTML = "Jogos:";
    divBox.id = "box";

    const menu = ["Inicio", "Quizzes", "Historias", "Receitas"];

    const quadrado1 = document.createElement('div');
    quadrado1.classList.add("quadrado");
    divBox.appendChild(quadrado1);
    quadrado1.addEventListener('click', function () {
        initializeGameMemory();
    });

    const quadrado2 = document.createElement('div');
    quadrado2.classList.add("quadrado");
    divBox.appendChild(quadrado2);
    quadrado2.addEventListener('click', function () {
        const randomNumber = Math.floor(Math.random() * 2) + 1;
        if (randomNumber === 1) {
            initializeGameGraphicGame1();
        } else {
            initializeGameGraphicGame2();
        }
    });

    const quadrado3 = document.createElement('div');
    quadrado3.classList.add("quadrado");
    divBox.appendChild(quadrado3);
    quadrado3.addEventListener('click', function () {
        const randomNumber = Math.floor(Math.random() * 3) + 1;
        if (randomNumber === 1) {
            initializeGameCrossWordFruits();
        } else if (randomNumber === 2) {
            initializeGameCrossWordFoods();
        } else {
            initializeGameCrossWordVegetables();
        }
    });

    div.appendChild(h3);
    div.appendChild(divBox);
    main.appendChild(img);
    main.appendChild(div);

    root.appendChild(header(menu));
    root.appendChild(main);
    root.appendChild(footer());

    return root;
}