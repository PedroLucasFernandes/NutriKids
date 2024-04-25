import header from "../header/header.js";
import footer from "../footer/footer.js";

export default function Game() {
    const root = document.getElementById('root');
    root.innerHTML = "";
    const test = document.getElementById('css');
    test.href = "../../../../../css/User/Secao.css";

    const main = document.createElement('main');
    const img = document.createElement('img');
    const div = document.createElement('div')
    const divBox = document.createElement('div');
    const h3 = document.createElement('h3');
    
    img.src = "./images/cereja2.png";
    h3.innerHTML = "Jogos:";
    divBox.id = "box";

    const menu = ["Inicio", "Quizzes", "Historias", "Receitas"];

    for (let i = 0; i < 3; i++) {
        const quadrado = document.createElement('div');
        quadrado.classList.add("quadrado");
        divBox.appendChild(quadrado);
    }
    
    div.appendChild(h3);
    div.appendChild(divBox);
    main.appendChild(img);
    main.appendChild(div);

    root.appendChild(header(menu));
    root.appendChild(main);
    root.appendChild(footer());

    return root;
}