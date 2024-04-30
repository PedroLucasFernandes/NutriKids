import Header from "../header/header.js";
import editQuiz from "./EditQuiz.js";

export default function QuizzesAdmin() {
    const root = document.getElementById('root');
    root.innerHTML = "";
    const test = document.getElementById('css');
    test.href = "../../../../../css/Admin/Secao.css";

    const main = document.createElement('main');
    const h3 = document.createElement('h3');
    const divQuiz = document.createElement('div');
    const buttonAddQuizzes = document.createElement('button');
    const h4 = document.createElement('h4');
    const divContent = document.createElement('div');

    h3.innerHTML = "Quizzes";
    h3.id = "title";
    buttonAddQuizzes.innerHTML = "Criar novo Quiz";
    h4.innerHTML = "Voltar";
    divContent.id = "admin";
    divQuiz.classList.add("divItens");
    divQuiz.id = "funciona";

    getQuiz();

    main.appendChild(h3);
    main.appendChild(divQuiz);
    main.appendChild(buttonAddQuizzes);
    main.appendChild(h4);

    buttonAddQuizzes.addEventListener("click", () => {
        const event = new CustomEvent("pageChange", {detail: "/AddQuizzes"});

        window.dispatchEvent(event);
    });

    h4.addEventListener("click", function(){
        const event = new CustomEvent("pageChange", {detail: "/Admin"});

        window.dispatchEvent(event);
    });

    divContent.appendChild(Header());
    divContent.appendChild(main);
    root.appendChild(divContent);

    return root;
}

async function getQuiz() {
    try {
        const response = await fetch("http://localhost:3000/api/quiz");

        if (!response.status) {
            throw new Error('Erro na requisição');
        }

        const data = await response.json();
        return render(data);
    }
    catch (error) {
        console.error(`Erro na requisição: ${error}`);
    }
}

function render(data) {
    const sla = document.getElementById('funciona');

    for (const item of data) {
        const div = document.createElement("div");
        div.classList.add("box");

        const title = document.createElement("h3");
        const img = document.createElement("img");
        const divbtn = document.createElement("div");
        const btnEdit = document.createElement("button");
        const btnDelete = document.createElement("button");

        btnEdit.innerHTML = "✏️";
        btnDelete.innerHTML = "🗑️";
        divbtn.id = "btn";

        title.innerHTML = item.title;
        img.src = `./uploads/${item.image_path}`;

        btnEdit.addEventListener('click', function () {
            editQuiz(item.id);
        });

        btnDelete.addEventListener('click', function() {
            deleteQuiz(item.id);
        });

        divbtn.appendChild(btnEdit);
        divbtn.appendChild(btnDelete);

        div.appendChild(title);
        div.appendChild(img);
        div.appendChild(divbtn);

        sla.appendChild(div);
    }
}

async function deleteQuiz(id) {
    try {
        const response = await fetch(`http://localhost:3000/api/quiz/${id}`, {
            method: 'DELETE'
        });
    }
    catch (error) {
        console.error(`Erro na requisição: ${error}`);
    }
}