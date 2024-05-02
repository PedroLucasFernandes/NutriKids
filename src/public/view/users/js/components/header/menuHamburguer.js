export default function menuHamburguer() {
    const root = document.getElementById("root")
    const test = document.getElementById('css');
    test.href = "../../../../../css/User/menuHamburguer.css"
    const header = document.createElement('header');
    const divHeader = document.createElement('div');
    const h2 = document.createElement('h2')
    const main = document.createElement('main');
    const div = document.createElement('div');
    const img = document.createElement('img');
    const fechar = document.createElement('img');

    // root.innerHTML = "";
    fechar.id = "fechar"
    divHeader.id = "head"

    h2.innerHTML = "NutriKids";

    const menu = ["Inicio" ,"Jogos", "Quizzes", "Historias", "Receitas"];

    for (const item of menu) {
        const h3 = document.createElement('h3');
        h3.innerHTML = item;

        h3.addEventListener("click", ()=> {
            root.innerHTML = ""
            const event = new CustomEvent("pageChange", {detail: `/${item}`});

            window.dispatchEvent(event);
        })

        div.appendChild(h3)
    }

    const h3About = document.createElement('h3');
    h3About.innerHTML = "Sobre Nós";

    h3About.addEventListener("click", ()=> {
        const event = new CustomEvent("pageChange", {detail: "/Sobre-nos"});

        window.dispatchEvent(event);
    })

    div.appendChild(h3About)

    fechar.src = "./images/fechar.png"
    img.src = "./images/logo.png";

    header.appendChild(fechar);
    header.appendChild(h2);
    main.appendChild(div);
    main.appendChild(img);
    root.appendChild(header)
    root.appendChild(main)

    fechar.addEventListener("click", () => {
        root.innerHTML = ""
        const event = new CustomEvent("pageChange", {detail: "/Inicio"});

        window.dispatchEvent(event);
    })

    return root;
}