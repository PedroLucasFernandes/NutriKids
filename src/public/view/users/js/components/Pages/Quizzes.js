import header from "../header/header.js";
import footer from "../footer/footer.js";

export default function Quizzes() {
    const root = document.getElementById('root');
    root.innerHTML = "";
    const test = document.getElementById('css');
    test.href = "../../../../../css/User/Secao.css";

    const main = document.createElement('main');
    const img = document.createElement('img');
    const div = document.createElement('div');
    const h3 = document.createElement('h3');
    const divBox = document.createElement('div');

    img.src = "./images/couve2.png";
    h3.innerHTML = "Quizzes:";
    divBox.id = "box";

    const menu = ["Inicio", "Jogos", "Historias", "Receitas"];

    
    div.appendChild(h3);
    div.appendChild(divBox);
    main.appendChild(img);
    main.appendChild(div);

    root.appendChild(header(menu));
    root.appendChild(main);
    root.appendChild(footer());

    return root;
}