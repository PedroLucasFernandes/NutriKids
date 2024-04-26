import Header from "../header/header.js";
import ModalHistory from "../modal/ModalHistory.js";

export default function EditHistory(id) {
    const test = document.getElementById('css');
    test.href = "../../../../../css/Admin/Add.css";
    const root = document.getElementById('root');
    root.innerHTML = "";

    const main = document.createElement('main');
    const h3 = document.createElement('h3');
    const divHistory = document.createElement('div');
    const h4Image = document.createElement('h4');
    const imageButton = document.createElement('button')
    const h4Title = document.createElement('h4');
    const h4Comics = document.createElement('h4');
    const h4History = document.createElement('h4');
    const inputFile = document.createElement('input');
    const inputTitle = document.createElement('input');
    const inputHistory = document.createElement('textarea')
    const buttonNewComics = document.createElement('button');
    const buttonAdd = document.createElement('button');
    const h4Back = document.createElement('h4');
    const divContent = document.createElement('div');
    const divAddImage = document.createElement('div');
    const form = document.createElement('form');

    h3.innerHTML = "Crie/Edite uma História";
    h4Image.innerHTML = "Capa:";
    h4Title.innerHTML = "Título:";
    h4Comics.innerHTML = "Quadrinhos atuais:";
    h4History.innerHTML = "Historia:";
    inputFile.type = "file";
    inputFile.id = "file";
    buttonNewComics.innerHTML = "novo quadrinho";
    divAddImage.id = "image";
    buttonNewComics.accept = "image/*";
    buttonNewComics.multiple = true;
    buttonAdd.innerHTML = "Adicionar à platarforma";
    h4Back.innerHTML = "Voltar";
    h4Back.id = "backButton";
    divContent.id = "admin";
    // divHistory.innerHTML = "Insira uma capa primeiro"
    divHistory.classList.add("divItens");
    divAddImage.id = "div-image";
    inputTitle.id = "title";
    inputHistory.id = "history";
    divHistory.id = "itens";

    getHistory(id);

    form.appendChild(h4Image);
    form.appendChild(inputFile);
    form.appendChild(h4Title);
    form.appendChild(inputTitle);
    form.appendChild(h4History);
    form.appendChild(inputHistory);
    form.appendChild(h4Comics);
    form.appendChild(divHistory);
    form.appendChild(buttonAdd);

    main.appendChild(form);
    main.appendChild(h4Back);

    const arrayImg = [];

    inputFile.addEventListener("change", function (e) {
        divHistory.innerHTML = "";

        const inputTarget = e.target;
        const file = inputTarget.files[0];

        arrayImg.push(file);
        console.log(arrayImg);

        divHistory.appendChild(divAddImage);
        divHistory.appendChild(buttonNewComics);
    });

    buttonNewComics.addEventListener("click", function (e) {
        e.preventDefault();
        root.appendChild(ModalHistory(arrayImg));
    });

    buttonAdd.addEventListener("click", async function (e) {
        e.preventDefault();

        const formData = new FormData();
        formData.append("title", inputTitle.value);
        formData.append("story", inputHistory.value);
        formData.append("created_by", 1);
        formData.append("updated_by", 1);
        // formData.append("file", arrayImg)
        arrayImg.forEach(img => formData.append("file", img));
        
        console.log(formData.entries());

        try {
            await updateHistory(formData, id);
        } catch (error) {
            console.error(`Erro na requisição: ${error}`);
        }
    });

    h4Back.addEventListener("click", function () {
        const event = new CustomEvent("pageChange", { detail: "/HistoryAdmin" });

        window.dispatchEvent(event);
    });

    divContent.appendChild(Header());
    divContent.appendChild(main);
    root.appendChild(divContent);

    return root;
}

async function getHistory(item) {
    try {
        console.log(item);
        console.log(`http://localhost:3000/api/history/:`,item);
        const response = await fetch(`http://localhost:3000/api/history/${item}`);

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
    const inputHistory = document.getElementById("history");
    const divitens = document.getElementById('itens')
    const inputFile = document.getElementById("file");

    // inputFile.value = data.image_path;
    inputTitle.value = data.title;
    inputHistory.value = data.story;

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

async function updateHistory(formData, id) {
    console.log(formData);
    console.log(id);

    try {
        // const contentType = 'multipart/form-data; boundary=' + formData.boundary;

        const response = await fetch(`http://localhost:3000/api/history/${id}`, {
            method: 'PUT',
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