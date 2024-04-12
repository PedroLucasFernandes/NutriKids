export default function footer (){
    const footer = document.createElement('footer');
    const div = document.createElement('div');
    const img = document.createElement('img');
    const nav = document.createElement('nav');
    const linha = document.createElement('div')
    const h4 = document.createElement('h4');
    const ul = document.createElement('ul');

    img.src = "../../image/logo.png";
    linha.id = "linha";
    nav.id = "navegacao"
    h4.innerHTML = "No NutriKids você vai se divertir ao mesmo tempo que aprende diversas curiosidades no mundo da culianária, estamos aqui para ensinar as crianças como é bom e saudavel comer e fazer seus proprios pratos!";

    const menu = ["Jogos", "Quizzes", "Historias", "Receitas"];

    for (const item of menu){
        const li = document.createElement('li');
        li.innerHTML = item

        ul.appendChild(li);
    }

    nav.appendChild(ul);
    div.appendChild(img);
    div.appendChild(nav);
    div.appendChild(linha);
    div.appendChild(h4);
    footer.appendChild(div);

    return footer
}