import header from "../header/header.js";
import footer from "../footer/footer.js";
import makeRecipe from "./makeRecipe.js";

export default function Recipes() {
    const root = document.getElementById('root');
    root.innerHTML = "";
    const test = document.getElementById('css');
    test.href = "../../../../../css/User/Secao.css"

    const main = document.createElement('main');
    const img = document.createElement('img');
    const div = document.createElement('div')
    const h3 = document.createElement('h3');
    const divBox = document.createElement('div');

    img.src = "./images/cerejaReceita2.png";
    h3.innerHTML = "Receitas:";
    divBox.id = "box"
    main.id = "main"

    const menu = ["Inicio", "Jogos", "Quizzes", "Historias"]

    getRecipes()
    
    div.appendChild(h3);
    div.appendChild(divBox);
    main.appendChild(img);
    main.appendChild(div);

    root.appendChild(header(menu));
    root.appendChild(main);
    root.appendChild(footer());

    return root;
}

async function getRecipes() {
    try {
        const response = await fetch("http://localhost:3000/api/recipe");

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
    const sla = document.getElementById('box')

    for (const item of data) {
        const div = document.createElement("div")
        div.classList.add("box")

        const title = document.createElement("h3");
        const img = document.createElement("img");

        console.log(data)
        console.log(item.title)
        title.innerHTML = item.title;
        img.src = `./uploads/${item.image_path}`;

        div.addEventListener('click', function () {
            console.log(item)
            makeRecipe(item)
        })

        div.appendChild(title);
        div.appendChild(img);

        sla.appendChild(div)
    }
}