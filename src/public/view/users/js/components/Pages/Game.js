import header from "../header/header.js";
import footer from "../footer/footer.js";

export default function Game() {
    const root = document.getElementById('root');
    root.innerHTML = "";

    const main = document.createElement('main');
    const img = document.createElement('img');
    const div = document.createElement('div')
    const h3 = document.createElement('h3');

    img.src = "./images/cereja2.png";
    h3.innerHTML = "Jogos";

    const menu = ["Inicio", "Quizzes", "Historias", "Receitas"]
    
    div.appendChild(img);
    div.appendChild(h3);
    main.appendChild(div);

    root.appendChild(header(menu));
    root.appendChild(main);
    root.appendChild(footer());

    return root;
}