import Header from "../header/header";

export default function Quizzes() {
    const root = document.getElementById('root');
    const main = document.createElement('main');
    const h3 = document.createElement('h3');
    const div = document.createElement('div');
    const button = document.createElement('button');
    const footer = document.createElement('footer');

    h3.innerHTML = "Quizzes";
    button.innerHTML = "Criar novo Quiz";
    footer.innerHTML = "Voltar";

    main.appendChild(h3);
    main.appendChild(div);
    main.appendChild(button);
    root.appendChild(Header());
    root.appendChild(main);
    root.appendChild(footer);

    return root;
}