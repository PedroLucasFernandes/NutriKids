export default function footer (){
    const footer = document.createElement('footer');
    const div = document.createElement('div');
    const img = document.createElement('img');
    const nav = document.createElement('nav');
    const linha = document.createElement('div');
    const h4 = document.createElement('h4');
    const ul = document.createElement('ul');

    img.src = "./images/logo.png";
    linha.id = "linha";
    nav.id = "navegacao";
    h4.innerHTML = "No NutriKids você vai se divertir ao mesmo tempo que aprende diversas curiosidades no mundo da culianária, estamos aqui para ensinar as crianças como é bom e saudavel comer e fazer seus proprios pratos!";

    const menu = [
        {
            name: "Jogos",
            route: "Jogos",
            img: "./images/iconHistory.png"
        },
        {
            name: "Quizzes",
            route: "Quizzes",
            img: "./images/iconHistory.png"
        },
        {
            name: "Histórias",
            route: "Historias",
            img: "./images/iconHistory.png"
        },
        {
            name: "Receitas",
            route: "Receitas",
            img: "./images/iconHistory.png"
        },
        {
            name: "Administrativo",
            route: "Administrativo",
            img: "./images/iconHistory.png"
        }
    ];

    for (const item of menu){
        const li = document.createElement('li');
        li.innerHTML = item.name;

        li.addEventListener("click", ()=> {
            const event = new CustomEvent("pageChange", {detail: `/${item.route}`});

            window.dispatchEvent(event);
        });

        ul.appendChild(li);
    }

    nav.appendChild(ul);
    div.appendChild(img);
    div.appendChild(nav);
    div.appendChild(linha);
    div.appendChild(h4);
    footer.appendChild(div);

    return footer;
}