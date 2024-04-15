export default function menuHamburguer() {
    const root = document.getElementById("root")
    const divroot = document.createElement("div")
    const header = document.createElement('header');
    const divHeader = document.createElement('div');
    const h2 = document.createElement('h2')
    const main = document.createElement('main');
    const div = document.createElement('div');
    const img = document.createElement('img');
    const fechar = document.createElement('img');

    // root.innerHTML = "";
    divroot.id = "test"
    fechar.id = "fechar"
    divHeader.id = "head"

    h2.innerHTML = "NutriKids";

    const menu = ["Inicio" ,"Jogos", "Quizzes", "Historias", "Receitas"];

    for (const item of menu) {
        const h3 = document.createElement('h3');
        h3.innerHTML = item;

        h3.addEventListener("click", ()=> {
            divroot.innerHTML = ""
            divroot.id = "root"
            const event = new CustomEvent("pageChange", {detail: `/${item}`});

            window.dispatchEvent(event);
        })

        div.appendChild(h3)
    }

    fechar.src = "./images/fechar.png"
    img.src = "./images/logo.png";

    divHeader.appendChild(fechar);
    divHeader.appendChild(h2);
    header.appendChild(divHeader);
    main.appendChild(div);
    main.appendChild(img);
    divroot.appendChild(header);
    divroot.appendChild(main);
    root.appendChild(divroot)

    fechar.addEventListener("click", () => {
        divroot.innerHTML = ""
        divroot.id = "root"
        const event = new CustomEvent("pageChange", {detail: "/Inicio"});

        window.dispatchEvent(event);
    })

    return root;
}