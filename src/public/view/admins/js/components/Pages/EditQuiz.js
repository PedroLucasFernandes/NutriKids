import Header from "../header/header.js";
import ModalQuizzes from "../modal/ModalQuizzes.js";

export default function editQuiz(id) {
    const test = document.getElementById('css');
    test.href = "../../../../../css/Admin/Add.css";
    const root = document.getElementById('root');
    root.innerHTML = "";

    const main = document.createElement('main');
    const h3 = document.createElement('h3');
    const divQuiz = document.createElement('div');
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

    h3.innerHTML = "Crie/Edite um Quiz";
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
    divQuiz.classList.add("divItens");
    divAddImage.id = "div-image";
    inputTitle.id = "title";
    divQuiz.id = "itens";

    updateHistory(id);

    form.appendChild(h4Image);
    form.appendChild(inputFile);
    form.appendChild(h4Title);
    form.appendChild(inputTitle);
    form.appendChild(h4Questions);
    form.appendChild(divQuiz);
    form.appendChild(buttonAdd);

    main.appendChild(form);
    main.appendChild(h4Back);

    const arrayImg = [];

    inputFile.addEventListener("change", function (e) {
        divQuiz.innerHTML = "";

        const inputTarget = e.target;
        const file = inputTarget.files[0];

        arrayImg.push(file);
        console.log(arrayImg);

        divQuiz.appendChild(divAddImage);
        divQuiz.appendChild(buttonNewQuestions);
    });

    buttonNewQuestions.addEventListener("click", function (e) {
        e.preventDefault();
        root.appendChild(ModalQuizzes(arrayImg));
    });

    buttonAdd.addEventListener("click", async function (e) {
        e.preventDefault();

        const formData = new FormData();
        formData.append("title", inputTitle.value);
        formData.append("created_by", 1);
        formData.append("updated_by", 1);
        // formData.append("file", arrayImg)
        arrayImg.forEach(img => formData.append("file", img));
        
        console.log(formData.entries());

        try {
            await addHistory(formData);
        } catch (error) {
            console.error(`Erro na requisição: ${error}`);
        }
    });

    h4Back.addEventListener("click", function () {
        const event = new CustomEvent("pageChange", { detail: "/QuizzesAdmin" });

        window.dispatchEvent(event);
    });

    divContent.appendChild(Header());
    divContent.appendChild(main);
    root.appendChild(divContent);

    return root;
}

async function updateHistory(item) {
    try {
        console.log(item);
        console.log(`http://localhost:3000/api/quiz/:`,item);
        const response = await fetch(`http://localhost:3000/api/quiz/${item}`);

        if (!response.status) {
            throw new Error('Erro na requisição');
        }

        const data = await response.json();
        console.log(data);

        return renderEdit(data);
    }
    catch (error) {
        console.error(`Erro na requisição: ${error}`);
    }
}

function renderEdit(data){
    const inputTitle = document.getElementById("title");
    const divitens = document.getElementById('itens')
    const inputFile = document.getElementById("file");

    // inputFile.value = data.image_path;
    inputTitle.value = data.title;

    for(const item of data.comics) {
        const boxImage = document.createElement('img');
        const divAddImage = document.createElement('div');
        divAddImage.id = "box-image"
        const div = document.getElementById('div-image');

        boxImage.src = `./uploads/${item.image_path}`;
        divAddImage.appendChild(boxImage);
        divitens.appendChild(divAddImage);
    }
}

async function addHistory(formData) {
    console.log(formData);

    try {
        // const contentType = 'multipart/form-data; boundary=' + formData.boundary;

        const response = await fetch('http://localhost:3000/api/quiz', {
            method: 'POST',
            body: formData,
            // headers: {
            //     "Content-Type": contentType
            // }
        });

        if (!response.status) {
            throw new Error('Erro na requisição');
        }

        const data = await response.json();
        console.log(data);
    }
    catch (error) {
        console.error(`Erro na requisição: ${error}`);
    }
}