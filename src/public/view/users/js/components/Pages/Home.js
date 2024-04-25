import header from "../header/header.js";
import jogos from "../destaques/jogos.js";
import quizzes from "../destaques/quizzes.js";
import historias from "../destaques/historias.js";
import receita from "../destaques/receitas.js";
import footer from "../footer/footer.js";

export default function Home() {
    const test = document.getElementById('css');
    test.href = "../../../../../css/User/Home.css";
    const root = document.getElementById("root");
    root.innerHTML = "";

    const main = document.createElement('main');
    main.id = "main";

    const menu = ["Jogos", "Quizzes", "Historias", "Receitas"];

    main.appendChild(jogos());
    main.appendChild(quizzes());
    main.appendChild(historias());
    main.appendChild(receita());

    root.appendChild(header(menu));
    root.appendChild(main);
    root.appendChild(footer());

    return root;
}