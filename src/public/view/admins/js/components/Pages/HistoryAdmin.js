import Header from "../header/header.js";
import EditHistory from "./EditHistory.js";

export default function HistoryAdmin() {
    const root = document.getElementById('root');
    root.innerHTML = ""
    const test = document.getElementById('css');
    test.href = "../../../../../css/Admin/Secao.css"

    const main = document.createElement('main');
    const h3 = document.createElement('h3');
    const divHistory = document.createElement('div');
    const buttonAddHistory = document.createElement('button');
    const h4 = document.createElement('h4');
    const divContent = document.createElement('div');

    h3.innerHTML = "Histórias";
    buttonAddHistory.innerHTML = "Criar nova História";
    h4.innerHTML = "Voltar";
    divContent.id = "admin";
    divHistory.classList.add("divItens")
    divHistory.id = "funciona"

    getHistory()

    main.appendChild(h3);
    main.appendChild(divHistory);
    main.appendChild(buttonAddHistory);
    main.appendChild(h4);

    buttonAddHistory.addEventListener("click", () => {
        const event = new CustomEvent("pageChange", { detail: "/AddHistory" })

        window.dispatchEvent(event)
    })

    h4.addEventListener("click", function () {
        const event = new CustomEvent("pageChange", { detail: "/Admin" })

        window.dispatchEvent(event)
    })

    divContent.appendChild(Header());
    divContent.appendChild(main);
    root.appendChild(divContent)

    return root
}

async function getHistory() {
    try {
        const response = await fetch("http://localhost:3000/api/history");

        if (!response.status) {
            throw new Error('Erro na requisição');
        }

        const data = await response.json()
        console.log(data)

        return render(data)
    }
    catch (error) {
        console.error(`Erro na requisição: ${error}`);
    }
}

function render(data) {
    const sla = document.getElementById('funciona')

    for (const item of data) {
        const div = document.createElement("div")
        div.classList.add("box")

        const title = document.createElement("h3");
        const img = document.createElement("img");
        const divbtn = document.createElement("div");
        const btnEdit = document.createElement("button");
        const btnDelete = document.createElement("button");

        btnEdit.innerHTML = "✏️"
        btnDelete.innerHTML = "🗑️"
        divbtn.id = "btn"

        console.log(data)
        console.log(item.title)
        title.innerHTML = item.title;
        img.src = `./uploads/${item.image_path}`;

        btnEdit.addEventListener('click', function () {
            EditHistory(item.id)
        })

        btnDelete.addEventListener('click', function() {
            deleteHistory(item.id)
        })

        divbtn.appendChild(btnEdit);
        divbtn.appendChild(btnDelete);

        div.appendChild(title);
        div.appendChild(img);
        div.appendChild(divbtn);

        sla.appendChild(div)
    }
}

async function deleteHistory(id) {
    try {
        const response = await fetch(`http://localhost:3000/api/history/${id}`, {
            method: 'DELETE'
        });

        const data = await response.json();

        console.log(data);
    }
    catch (error) {
        console.error(`Erro na requisição: ${error}`);
    }
}