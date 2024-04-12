import jogos from "../destaques/jogos.js"
import quizzes from "../destaques/quizzes.js";
import historias from "../destaques/historias.js";
import receita from "../destaques/receitas.js";

export default function main() {
    const main = document.createElement('main')

    main.appendChild(jogos());
    main.appendChild(quizzes());
    main.appendChild(historias())
    main.appendChild(receita())

    return main
}