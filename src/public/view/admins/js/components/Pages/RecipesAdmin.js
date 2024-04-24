import Header from "../header/header.js";
import ModalRecipes from "../modal/ModalRecipes.js";

export default function RecipesAdmin() {
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

    h3.innerHTML = "Receitas";
    buttonAddHistory.innerHTML = "Criar nova Receita";
    h4.innerHTML = "Voltar";
    divContent.id = "admin";
    divHistory.classList.add("divItens");
    divHistory.id = "funciona"

    getRecipes()

    main.appendChild(h3);
    main.appendChild(divHistory);
    main.appendChild(buttonAddHistory);
    main.appendChild(h4);

    buttonAddHistory.addEventListener("click", () => {
        root.appendChild(ModalRecipes());
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
            console.log(item)
            editRecipe(item)
        })

        btnDelete.addEventListener('click', function () {
            deleterecipe(item.id)
        })

        divbtn.appendChild(btnEdit);
        divbtn.appendChild(btnDelete);

        div.appendChild(title);
        div.appendChild(img);
        div.appendChild(divbtn);

        sla.appendChild(div)
    }
}

async function deleterecipe(id) {
    try {
        const response = await fetch(`http://localhost:3000/api/recipe/${id}`, {
            method: 'DELETE'
        });

        const data = await response.json();

        console.log(data);
    }
    catch (error) {
        console.error(`Erro na requisição: ${error}`);
    }
}

function editRecipe(data) {
    const root = document.getElementById('root');

    const modal = document.createElement('div');
    const modalContent = document.createElement('div');
    const h3 = document.createElement('h3');
    const h4Capa = document.createElement('h4')
    const inputImg = document.createElement('input');
    const h4Title = document.createElement('h4');
    const inputTitle = document.createElement('input');
    const h4Ingredients = document.createElement('h4');
    const inputIngredients = document.createElement('textarea');
    const h4ModoDePreparo = document.createElement('h4');
    const textModoDePreparo = document.createElement('textarea')
    const h4explication = document.createElement('h4');
    const inputExplication = document.createElement('textarea')
    const close = document.createElement('h2');
    const button = document.createElement('button');

    console.log(data)

    h3.innerHTML = "Editar Receita";
    close.innerHTML = "X";
    button.innerHTML = "COnfirmar";
    modal.id = "modal"
    modalContent.id = "modal-content"
    h4Ingredients.innerHTML = "Ingredientes:";
    h4ModoDePreparo.innerHTML = "Modo de preparo:"
    h4explication.innerHTML = "Rendimento:"
    h4Capa.innerHTML = "Capa:";
    inputImg.type = "file"
    h4Title.innerHTML = "Titulo:"

    inputImg.value = `./uploads/${data.image_path}`
    inputTitle.value = data.title;
    inputIngredients.value = data.ingredients;
    textModoDePreparo.value = data.instructions;
    inputExplication.value = data.yield;

    modalContent.appendChild(close);
    modalContent.appendChild(h3);
    modalContent.appendChild(h4Capa);
    modalContent.appendChild(inputImg);
    modalContent.appendChild(h4Title);
    modalContent.appendChild(inputTitle);
    modalContent.appendChild(h4Ingredients);
    modalContent.appendChild(inputIngredients);
    modalContent.appendChild(h4ModoDePreparo);
    modalContent.appendChild(textModoDePreparo);
    modalContent.appendChild(h4explication);
    modalContent.appendChild(inputExplication);
    modalContent.appendChild(button);

    const imgFile = []

    inputImg.addEventListener("change", function(e){
        const file = inputImg.files[0];

        imgFile.push(file)
    }) 

    button.addEventListener("click", async function (e) {
        e.preventDefault()
        // const title = inputTitle.value;
        // const history = inputHistory.value;

        const formData = new FormData();
        formData.append("title", inputTitle.value)
        formData.append("ingredients", inputIngredients.value)
        formData.append("instructions", textModoDePreparo.value)
        formData.append("yield", inputExplication.value)
        formData.append("created_by", 1)
        formData.append("updated_by", 1)
        // formData.append("file", inputImg)
        imgFile.forEach(img => formData.append("file", img))

        console.log(formData.entries());

        try {
            modal.innerHTML = "";
            modal.style.display = "none"
            await updatedRecipe(formData, data.id);
        } catch (error) {
            console.error(`Erro na requisição: ${error}`);
        }
    })

    close.addEventListener("click", function() {
        modal.innerHTML = "";
        modal.style.display = "none"
    })

    modal.appendChild(modalContent);
    root.appendChild(modal)
}

async function updatedRecipe(formdata, id) {
    try {
        const response = await fetch(`http://localhost:3000/api/recipe/${id}`, {
            method: 'PUT',
            body: formdata
        });

        const data = await response.json();

        console.log(data);
    }
    catch (error) {
        console.error(`Erro na requisição: ${error}`);
    }
}