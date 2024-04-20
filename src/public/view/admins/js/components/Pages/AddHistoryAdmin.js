import Header from "../header/header.js";
import ModalHistory from "../modal/ModalHistory.js";

export default function AddHistory() {
    const test = document.getElementById('css');
    test.href = "../../../../../css/Admin/Add.css"
    const root = document.getElementById('root');
    root.innerHTML = "";

    const main = document.createElement('main');
    const h3 = document.createElement('h3');
    const divHistory = document.createElement('div');
    const h4Image = document.createElement('h4');
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

    h3.innerHTML = "Crie/Edite umma História";
    h4Image.innerHTML = "Capa:";
    h4Title.innerHTML = "Título:";
    h4Comics.innerHTML = "Quadrinhos atuais:";
    h4History.innerHTML = "Historia:"
    inputFile.type = "file";
    buttonNewComics.innerHTML = "novo quadrinho"
    divAddImage.id = "image"
    buttonNewComics.accept = "image/*"
    buttonNewComics.multiple = true
    buttonAdd.innerHTML = "Adicionar à platarforma";
    h4Back.innerHTML = "Voltar";
    divContent.id = "admin";
    divHistory.classList.add("divItens")
    divAddImage.id = "div-image"

    divHistory.appendChild(divAddImage);
    divHistory.appendChild(buttonNewComics);

    main.appendChild(h3);
    main.appendChild(h4Image);
    main.appendChild(inputFile);
    main.appendChild(h4Title);
    main.appendChild(inputTitle);
    main.appendChild(h4Comics);
    main.appendChild(h4History);
    main.appendChild(inputHistory);
    main.appendChild(divHistory);
    main.appendChild(buttonAdd);
    main.appendChild(h4Back)

    buttonNewComics.addEventListener("click", function(){
        root.appendChild(ModalHistory());
    })

    buttonAdd.addEventListener("click", function () {
        const title = inputTitle.value;
        const history = inputHistory.value;

        console.log(title, history);

        addHistory(title, history)
    })

    h4Back.addEventListener("click", function () {
        const event = new CustomEvent("pageChange", { detail: "/HistoryAdmin" })

        window.dispatchEvent(event)
    })

    divContent.appendChild(Header());
    divContent.appendChild(main);
    root.appendChild(divContent);

    return root;
}

async function addHistory(title, story) {
    console.log(title, story)
    try {
        const response = await fetch('http://localhost:3000/api/history', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title: title, story: story, created_by: "admin1", updated_by: "admin1" })
        });

        if (!response.status) {
            throw new Error('Erro na requisição');
        }

        const data = await response.json();
        console.log(data)
    }
    catch (error) {
        console.error(`Erro na requisição: ${error}`)
    }
}