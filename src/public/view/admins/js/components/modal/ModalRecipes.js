export default function ModalRecipes() {
    const modal = document.createElement('div');
    const modalContent= document.createElement('div');
    const h3 = document.createElement('h3'); 
    const h4Ingredients = document.createElement('h4');
    const inputIngredients = document.createElement('textarea');
    const h4ModoDePreparo = document.createElement('h4');
    const textModoDePreparo = document.createElement('textarea')
    const h4explication = document.createElement('h4');
    const inputExplication = document.createElement('textarea') 
    const close = document.createElement('h2');
    const button = document.createElement('button');

    h3.innerHTML = "Criar nova Receita";
    close.innerHTML = "X";
    button.innerHTML = "Criar nova receita";
    modal.id = "modal"
    modalContent.id = "modal-content"
    h4Ingredients.innerHTML = "Ingredientes::";
    h4ModoDePreparo.innerHTML = "Modo de preparo:"
    h4explication.innerHTML = "Rendimento:"

    modalContent.appendChild(close);
    modalContent.appendChild(h3);
    modalContent.appendChild(h4Ingredients);
    modalContent.appendChild(inputIngredients);
    modalContent.appendChild(h4ModoDePreparo);
    modalContent.appendChild(textModoDePreparo);
    modalContent.appendChild(h4explication);
    modalContent.appendChild(inputExplication);
    modalContent.appendChild(button);

    modal.appendChild(modalContent);

    close.addEventListener("click", function() {
        modal.innerHTML = "";
        modal.style.display = "none"
    })

    button.addEventListener('click', function() {
        modal.innerHTML = "";
        modal.style.display = "none"
    })

    return modal
}