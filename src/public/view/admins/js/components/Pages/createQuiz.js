import Header from "../header/header";
import Modal from "../modal/Modal";

export default function Quizzes() {
    const root = document.getElementById('root');
    const main = document.createElement('main');
    const h3 = document.createElement('h3');
    const div = document.createElement('div');
    const h4Capa = document.createElement('h4');
    const h4Titulo = document.createElement('h4');
    const h4Perguntas = document.createElement('h4');
    const inputTitulo = document.createElement('input');
    const buttonImagem = document.createElement('button');
    const buttonPergunta = document.createElement('button');
    const buttonAdicionar = document.createElement('button');
    const footer = document.createElement('footer');

    h3.innerHTML = "Crie/Edite um Quiz";
    h4Capa.innerHTML = "Capa:";
    h4Titulo.innerHTML = "Título:";
    h4Perguntas.innerHTML = "Perguntas atuais:";
    buttonPergunta.innerHTML = "Nova pergunta";
    buttonAdicionar.innerHTML = "Adicionar à plataforma";
    footer.innerHTML = "Voltar";

    div.appendChild(buttonPergunta);

    main.appendChild(h3);
    main.appendChild(h4Capa);
    main.appendChild(buttonImagem);
    main.appendChild(h4Titulo);
    main.appendChild(inputTitulo);
    main.appendChild(h4Perguntas);
    main.appendChild(div);
    main.appendChild(buttonAdicionar);

    root.appendChild(Header());
    root.appendChild(main);
    root.appendChild(footer);

    return root;
}