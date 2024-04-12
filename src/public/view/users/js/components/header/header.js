export default function header() {
    const header = document.createElement('header');
    const nav = document.createElement('nav');
    const img = document.createElement('img');
    const menuImg = document.createElement('img')
    const h2 = document.createElement('h2');
    const ul = document.createElement('ul');

    menuImg.src = "../../image/menu.png"
    menuImg.id = "menu";

    img.src = "../../image/logo.png"
    img.id = "logo"
    h2.innerHTML = "NutriKids"

    const menu = ["Jogos", "Quizzes", "Historias", "Receitas"];

    for (const item of menu){
        const li = document.createElement('li');
        li.innerHTML = item

        ul.appendChild(li);
    }

    nav.appendChild(menuImg)
    nav.appendChild(img);
    nav.appendChild(h2);
    nav.appendChild(ul);
    header.appendChild(nav);

    return header;
};