import Header from "../header/header.js";
import ModalQuizzes from "../modal/ModalQuizzes.js";

export default function AddQuizzes() {
    const test = document.getElementById('css');
    test.href = "../../../../../css/Admin/AddQuiz.css";
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
    const buttonNewQuestions = document.createElement('button');
    const buttonAdd = document.createElement('button');
    const h4Back = document.createElement('h4');
    h4Back.id = "backButton";
    const divContent = document.createElement('div');
    const divAddImage = document.createElement('div');

    h3.innerHTML = "Crie um Quiz";
    h4Image.innerHTML = "Capa:";
    h4Title.innerHTML = "Título:";
    h4Quizzes.innerHTML = "Perguntas atuais:";
    inputFile.type = "file";
    buttonNewQuestions.innerHTML = "Nova Questão";
    divAddImage.id = "image";
    buttonNewQuestions.accept = "image/*";
    buttonNewQuestions.multiple = true;
    buttonAdd.innerHTML = "Adicionar à platarforma";
    h4Back.innerHTML = "Voltar";
    divContent.id = "admin";
    divQuizzes.classList.add("divItens");
    divAddImage.id = "div-image";
    buttonNewQuestions.id = "btn"

    // divQuizzes.appendChild(divAddImage);
    // divQuizzes.appendChild(buttonNewQuestions);

    main.appendChild(h3);
    main.appendChild(h4Image);
    main.appendChild(inputFile);
    main.appendChild(h4Title);
    main.appendChild(inputTitle);
    main.appendChild(h4Quizzes);
    main.appendChild(divQuizzes);
    main.appendChild(buttonNewQuestions);
    main.appendChild(buttonAdd);
    main.appendChild(h4Back);

    const arrayQuestions = [];
    const arrayImg = [];

    inputFile.addEventListener("change", function (e) {

        const inputTarget = e.target;
        const file = inputTarget.files[0];

        arrayImg.push(file);
    });

    buttonNewQuestions.addEventListener("click", function(){
        root.appendChild(ModalQuizzes(arrayQuestions, updateQuizzesDiv));
    });

    h4Back.addEventListener("click", function () {
        const event = new CustomEvent("pageChange", { detail: "/QuizzesAdmin" });

        window.dispatchEvent(event);
    });

    buttonAdd.addEventListener("click", async function (e) {
        e.preventDefault();

        const formData = new FormData();
        formData.append("title", inputTitle.value);
        formData.append("questions", JSON.stringify(arrayQuestions));
        formData.append("created_by", 1);
        formData.append("updated_by", 1);
        arrayImg.forEach(img => formData.append("file", img));
        
        try {
            await addQuiz(formData);
        } catch (error) {
            console.error(`Erro na requisição: ${error}`);
        }
    });

    function updateQuizzesDiv() {
        divQuizzes.innerHTML = "";
        
        arrayQuestions.forEach((question, index) => {
            const questionElement = document.createElement('div');
            const questionText = document.createElement('span');
            const deleteButton = document.createElement('button');
            const div = document.createElement('div');
            div.id = "container"
    
            questionElement.classList.add('question-container');
            questionText.textContent = `Pergunta ${index + 1}: ${question.question_text}`;
            deleteButton.textContent = "🗑️";
            deleteButton.classList.add('delete-button');
            
            deleteButton.addEventListener('click', function() {
                arrayQuestions.splice(index, 1);
                updateQuizzesDiv();
            });
    
            questionElement.appendChild(questionText);
            questionElement.appendChild(deleteButton);
            div.appendChild(questionElement);
            divQuizzes.appendChild(div);
        });
    
        // divQuizzes.appendChild(buttonNewQuestions);
    }

    divContent.appendChild(Header());
    divContent.appendChild(main);
    root.appendChild(divContent);

    return root;
}

async function addQuiz(formData) {
    try {
        const apiUrl = window.location.hostname === 'alpha01.alphaedtech.org.br'
               ? 'https://66.135.21.55:3000'
               : 'http://localhost:3000';

        const response = await fetch(`${apiUrl}/api/quiz`, {
            method: 'POST',
            body: formData,
        });

        if (!response.status) {
            throw new Error('Erro na requisição');
        }
    }
    catch (error) {
        console.error(`Erro na requisição: ${error}`);
    }
}