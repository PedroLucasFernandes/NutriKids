import Header from "../header/header.js";
import ModalQuizzes from "../modal/ModalQuizzes.js";

export default function editQuiz(id) {
    const test = document.getElementById('css');
    test.href = "../../../../../css/Admin/AddQuiz.css";
    const root = document.getElementById('root');
    root.innerHTML = "";

    const main = document.createElement('main');
    const h3 = document.createElement('h3');
    const divQuizzes = document.createElement('div');
    const h4Image = document.createElement('h4');
    const h4Title = document.createElement('h4');
    const h4Questions = document.createElement('h4');
    const inputFile = document.createElement('input');
    const inputTitle = document.createElement('input');
    const buttonNewQuestions = document.createElement('button');
    const buttonAdd = document.createElement('button');
    const h4Back = document.createElement('h4');
    const divContent = document.createElement('div');
    const divAddImage = document.createElement('div');
    const form = document.createElement('form');

    h3.innerHTML = "Edite um Quiz";
    h4Image.innerHTML = "Capa:";
    h4Title.innerHTML = "Título:";
    h4Questions.innerHTML = "Perguntas atuais:";
    inputFile.type = "file";
    inputFile.id = "file";
    buttonNewQuestions.innerHTML = "Nova Questão";
    divAddImage.id = "image";
    buttonNewQuestions.accept = "image/*";
    buttonNewQuestions.multiple = true;
    buttonAdd.innerHTML = "Adicionar à platarforma";
    h4Back.innerHTML = "Voltar";
    h4Back.id = "backButton";
    divContent.id = "admin";
    divQuizzes.classList.add("divItens");
    divAddImage.id = "div-image";
    inputTitle.id = "title";
    divQuizzes.id = "itens";

    updateQuiz(id);

    
    
    main.appendChild(h3);
    main.appendChild(h4Image);
    main.appendChild(inputFile);
    main.appendChild(h4Title);
    main.appendChild(inputTitle);
    main.appendChild(h4Questions);
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

    buttonNewQuestions.addEventListener("click", function(e) {
        e.preventDefault();
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
            await updateQuizData(id, formData);
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
            divQuizzes.appendChild(questionElement);
        });
    
        // divQuizzes.appendChild(buttonNewQuestions);
    }

    divContent.appendChild(Header());
    divContent.appendChild(main);
    root.appendChild(divContent);

    return root;
}

async function updateQuiz(item) {
    try {
        const apiUrl = window.location.hostname === 'alpha01.alphaedtech.org.br'
               ? 'https://alpha01.alphaedtech.org.br'
               : 'http://localhost:3000';

        const response = await fetch(`${apiUrl}/api/quiz/${item}`);

        if (!response.status) {
            throw new Error('Erro na requisição');
        }

        const data = await response.json();

        return renderEdit(data);
    }
    catch (error) {
        console.error(`Erro na requisição: ${error}`);
    }
}

function renderEdit(data){
    const inputTitle = document.getElementById("title");
    inputTitle.value = data.title;
}

async function updateQuizData(id, formData) {

    try {
        const apiUrl = window.location.hostname === 'alpha01.alphaedtech.org.br'
               ? 'https://alpha01.alphaedtech.org.br'
               : 'http://localhost:3000';

        const response = await fetch(`${apiUrl}/api/quiz/${id}`, {
            method: 'PUT',
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