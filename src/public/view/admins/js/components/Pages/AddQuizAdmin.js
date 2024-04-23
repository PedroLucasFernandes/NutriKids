import Header from "../header/header.js";
import ModalQuizzes from "../modal/ModalQuizzes.js";

export default function AddQuizzes() {
    const test = document.getElementById('css');
    test.href = "../../../../../css/Admin/Add.css"
    const root = document.getElementById('root');
    root.innerHTML = "";

    const main = document.createElement('main');
    const h3 = document.createElement('h3');
    const divQuizzes = document.createElement('div');
    const h4Image = document.createElement('h4');
    const h4Title = document.createElement('h4');
    const h4Quizzes = document.createElement('h4');
    const inputFile = document.createElement('input');
    const inputTitle = document.createElement('input');
    const buttonNewQuizzes = document.createElement('button');
    const buttonAdd = document.createElement('button');
    const h4Back = document.createElement('h4');
    const divContent = document.createElement('div');
    const divAddImage = document.createElement('div');

    h3.innerHTML = "Crie/Edite um Quiz";
    h4Image.innerHTML = "Capa:";
    h4Title.innerHTML = "Título:";
    h4Quizzes.innerHTML = "Quadrinhos atuais:";
    inputFile.type = "file";
    buttonNewQuizzes.innerHTML = "Nova pergunta"
    divAddImage.id = "image"
    buttonNewQuizzes.accept = "image/*"
    buttonNewQuizzes.multiple = true
    buttonAdd.innerHTML = "Adicionar à platarforma";
    h4Back.innerHTML = "Voltar";
    divContent.id = "admin";
    divQuizzes.classList.add("divItens")
    divAddImage.id = "div-image"

    divQuizzes.appendChild(divAddImage);
    divQuizzes.appendChild(buttonNewQuizzes);

    main.appendChild(h3);
    main.appendChild(h4Image);
    main.appendChild(inputFile);
    main.appendChild(h4Title);
    main.appendChild(inputTitle);
    main.appendChild(h4Quizzes);
    main.appendChild(divQuizzes);
    main.appendChild(buttonAdd);
    main.appendChild(h4Back);

    buttonNewQuizzes.addEventListener("click", function(){
        root.appendChild(ModalQuizzes());
    })

    h4Back.addEventListener("click", function () {
        const event = new CustomEvent("pageChange", { detail: "/QuizzesAdmin" })

        window.dispatchEvent(event)
    })

    divContent.appendChild(Header());
    divContent.appendChild(main);
    root.appendChild(divContent);

    return root;
}