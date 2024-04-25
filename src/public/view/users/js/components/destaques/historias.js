import comicsMain from "../Pages/Comics.js";

export default function historias() {
    const divMain = document.createElement('div');
    const img = document.createElement('img');
    const h3 = document.createElement('h3');
    const div = document.createElement('div');
    const divDestaque = document.createElement('div');
    const btnVerMais = document.createElement('button');

    img.src = "./images/beterraba1.png";

    h3.innerHTML = "Historias em destaques:";

    divDestaque.classList.add("conjunto");
    div.classList.add("destaques");
    div.id = "test"

    for (let i = 0; i < 2; i++) {
        getComicsID(i);
    }

    btnVerMais.innerHTML = "Ver mais!";

    divMain.classList.add("secao1");

    divDestaque.appendChild(h3);
    divDestaque.appendChild(div);
    divDestaque.appendChild(btnVerMais);

    divMain.appendChild(img);
    divMain.appendChild(divDestaque);

    btnVerMais.addEventListener("click", () => {
        const event = new CustomEvent("pageChange", { detail: "/Historias" });
        const main = document.querySelector("main");

        main.innerHTML = "";

        window.dispatchEvent(event);
    })

    return divMain;
}

async function getComicsID(i) {
    try {
        const response = await fetch(`http://localhost:3000/api/history/`);

        if (!response.status) {
            throw new Error('Erro na requisição');
        }

        const data = await response.json();
        console.log(data);

        render(data[i]);
    }
    catch (error) {
        console.error(`Erro na requisição: ${error}`);
    }
}

function render(data) {
    console.log(data);

    const divtest = document.getElementById('test');

    const div = document.createElement("div");
    div.classList.add("box");

    const title = document.createElement("h3");
    const img = document.createElement("img");

    console.log(data);
    console.log(data.title);
    title.innerHTML = data.title;
    img.src = `./uploads/${data.image_path}`;

    div.addEventListener('click', function () {
        console.log(data);
        comicsMain(data);
    });

    div.appendChild(title);
    div.appendChild(img);

    divtest.appendChild(div);
}