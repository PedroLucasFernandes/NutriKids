import header from "../header/header.js";
import footer from "../footer/footer.js";
import comicsMain from "./Comics.js";

export default function History() {
    const root = document.getElementById('root');
    root.innerHTML = "";
    const test = document.getElementById('css');
    test.href = "../../../../../css/User/Secao.css";

    const main = document.createElement('main');
    const img = document.createElement('img');
    const div = document.createElement('div');
    const h3 = document.createElement('h3');
    const divBox = document.createElement('div');

    img.src = "./images/beterraba2.png";
    h3.innerHTML = "Historias:";
    divBox.id = "box";
    main.id = "main";
    div.id = "container";

    const menu = ["Inicio", "Jogos", "Quizzes", "Receitas"];

    getHistory();

    div.appendChild(h3);
    div.appendChild(divBox);
    main.appendChild(img);
    main.appendChild(div);

    root.appendChild(header(menu));
    root.appendChild(main);
    root.appendChild(footer());

    return root;
}

async function getHistory() {
    try {
        const apiUrl = window.location.hostname === 'alpha01.alphaedtech.org.br'
               ? 'https://66.135.21.55:3000'
               : 'http://localhost:3000';
        
        const response = await fetch(`${apiUrl}/api/history`);

        if (!response.status) {
            throw new Error('Erro na requisição');
        }

        const data = await response.json();
        console.log(data);

        return render(data);
    }
    catch (error) {
        console.error(`Erro na requisição: ${error}`);
    }
}

function render(data) {
    const sla = document.getElementById('box');

    for (const item of data) {
        const div = document.createElement("div");
        div.classList.add("box");

        const title = document.createElement("h3");
        const img = document.createElement("img");

        console.log(data);
        console.log(item.title);
        title.innerHTML = item.title;
        img.src = `./uploads/${item.image_path}`;

        div.addEventListener('click', function () {
            console.log(item);
            comicsMain(item);
        });

        div.appendChild(title);
        div.appendChild(img);

        sla.appendChild(div);
    }
}