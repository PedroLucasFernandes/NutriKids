export default function ModalRecipes() {
    const modal = document.createElement('div');
    const modalContent= document.createElement('div');
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
    const div = document.createElement('div');

    h3.innerHTML = "Criar nova Receita";
    close.innerHTML = "X";
    button.innerHTML = "Criar nova receita";
    modal.id = "modal";
    modalContent.id = "modal-content";
    h4Ingredients.innerHTML = "Ingredientes:";
    h4ModoDePreparo.innerHTML = "Modo de preparo:";
    h4explication.innerHTML = "Rendimento:";
    h4Capa.innerHTML = "Capa:";
    inputImg.type = "file";
    h4Title.innerHTML = "Titulo:";

    modalContent.appendChild(close);
    modalContent.appendChild(h3);
    
    div.appendChild(h4Capa);
    div.appendChild(inputImg);
    div.appendChild(h4Title);
    div.appendChild(inputTitle);
    div.appendChild(h4Ingredients);
    div.appendChild(inputIngredients);
    div.appendChild(h4ModoDePreparo);
    div.appendChild(textModoDePreparo);
    div.appendChild(h4explication);
    div.appendChild(inputExplication);
    div.appendChild(inputExplication);

    modalContent.appendChild(div);
    modalContent.appendChild(button);

    modal.appendChild(modalContent);
    modal.appendChild(modalContent);

    const imgFile = [];

    inputImg.addEventListener("change", function(e){
        const file = inputImg.files[0];

        imgFile.push(file);
    });

    button.addEventListener("click", async function (e) {
        e.preventDefault();

        const formData = new FormData();
        formData.append("title", inputTitle.value);
        formData.append("ingredients", inputIngredients.value);
        formData.append("instructions", textModoDePreparo.value);
        formData.append("yield", inputExplication.value);
        formData.append("created_by", 1);
        formData.append("updated_by", 1);
        imgFile.forEach(img => formData.append("file", img));
        
        console.log(formData.entries());

        try {
            await addRecipes(formData);
        } catch (error) {
            console.error(`Erro na requisição: ${error}`);
        }
    });

    close.addEventListener("click", function() {
        modal.innerHTML = "";
        modal.style.display = "none";
    });

    button.addEventListener('click', function() {
        modal.innerHTML = "";
        modal.style.display = "none";
    });

    return modal;
}

async function addRecipes(formData) {
    console.log(formData);

    try {
        // const contentType = 'multipart/form-data; boundary=' + formData.boundary;

        const response = await fetch('http://localhost:3000/api/recipe', {
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