export default function makeRecipe(recipe) {
    const main = document.getElementById('main');
    main.innerHTML = "";
    const test = document.getElementById('css');
    test.href = "../../../../../css/User/Receita.css";

    const h3Title = document.createElement('h3');
    const div = document.createElement('div');
    const img = document.createElement('img');
    const h4Back = document.createElement('h4');
    h4Back.id = "backButton";
    const divImage = document.createElement('div');
    const h4rendimento = document.createElement('h4');
    const h3Ingredients = document.createElement('h3');
    const h4IngredientesDetails = document.createElement('h4');
    const divBox = document.createElement('div');
    const h3Instructions = document.createElement('h3');
    const h3InstructionsDetails = document.createElement('h4');
    const divInstructions = document.createElement('div');

    h3Title.innerHTML = recipe.title;
    h4rendimento.innerHTML = `Rendimentos: ${recipe.yield}`;
    h3Ingredients.innerHTML = "Ingredientes:";
    const ingredientes = recipe.ingredients.split("\n").map(ingrediente => {
        const p = document.createElement('p');
        p.textContent = ingrediente;
        return p;
    });
    ingredientes.forEach(ingrediente => divBox.appendChild(ingrediente));

    h3Instructions.innerHTML = "Como fazer:";
    const instrucoes = recipe.instructions.split("\n").map(instrucao => {
        const p = document.createElement('p');
        p.textContent = instrucao;
        return p;
    });
    instrucoes.forEach(instrucao => divInstructions.appendChild(instrucao));

    h4Back.innerHTML = "Voltar";
    divImage.id = "img";

    divBox.appendChild(h4rendimento);

    img.src = `./uploads/${recipe.image_path}`;
    div.appendChild(img);

    divImage.appendChild(div);

    h4Back.addEventListener("click", ()=> {
        const event = new CustomEvent("pageChange", {detail: "/Receitas"});

        window.dispatchEvent(event);
    });
    
    main.appendChild(h3Title);
    main.appendChild(divImage);
    main.appendChild(h3Ingredients);
    main.appendChild(divBox);
    main.appendChild(divInstructions);
    main.appendChild(h4Back);

    return main;
}