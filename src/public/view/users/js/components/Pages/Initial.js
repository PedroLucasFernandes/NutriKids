export default function Initial() {
    const header = document.createElement('header');
    const main = document.createElement('main')
    const container = document.createElement('div');
    const img = document.createElement('img');
    const div = document.createElement('div');
    const input = document.createElement('input');
    const button = document.createElement('button');
    const footer = document.createElement('footer');

    header.innerHTML = "NutriKids"
    container.id = "container"
    img.src = "./images/logoInicial.png"
    input.placeholder = "Apelido";
    button.innerHTML = "Entrar";
    footer.innerHTML = "Administrativo"

    div.appendChild(input);
    div.appendChild(button);
    main.appendChild(img);
    main.appendChild(div);
    container.appendChild(header);
    container.appendChild(main);
    container.appendChild(footer);

    button.addEventListener("click", () => {
        const event = new CustomEvent("pageChange", {detail: "/Main"})

        container.innerHTML = "";

        
        window.dispatchEvent(event)
    })

    footer.addEventListener("click", () => {
        const event = new CustomEvent("pageChange", {detail: "/Login"});

        window.dispatchEvent(event);
    })

    return container
}