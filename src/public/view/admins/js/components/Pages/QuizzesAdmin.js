import Header from "../header/header.js";

export default function QuizzesAdmin() {
    const root = document.getElementById('root');
    root.innerHTML = ""
    const test = document.getElementById('css');
    test.href = "../../../../../css/Admin/Secao.css"

    const main = document.createElement('main');
    const h3 = document.createElement('h3');
    const divHistory = document.createElement('div');
    const buttonAddQuizzes = document.createElement('button');
    const h4 = document.createElement('h4');
    const divContent = document.createElement('div');

    h3.innerHTML = "Quizzes";
    buttonAddQuizzes.innerHTML = "Criar novo Quiz";
    h4.innerHTML = "Voltar";
    divContent.id = "admin";
    divHistory.classList.add("divItens")

    main.appendChild(h3);
    main.appendChild(divHistory);
    main.appendChild(buttonAddQuizzes);
    main.appendChild(h4);

    buttonAddQuizzes.addEventListener("click", () => {
        const event = new CustomEvent("pageChange", {detail: "/AddQuizzes"})

        window.dispatchEvent(event)
    })

    h4.addEventListener("click", function(){
        const event = new CustomEvent("pageChange", {detail: "/Admin"})

        window.dispatchEvent(event)
    })

    divContent.appendChild(Header());
    divContent.appendChild(main);
    root.appendChild(divContent)

    return root
}