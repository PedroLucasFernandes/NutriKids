export default function Main() {
    const main = document.createElement('main');
    const h3 = document.createElement('h3');
    const container = document.createElement('div');

    h3.innerHTML = "Olá admin, bem vindo!";

    const menu = [
        {
            name: "History",
            img: "./images/iconHistory.png"
        },
        {
            name: "Quizzes",
            img: "./images/iconQuizzes.png"
        },
        {
            name: "Recipes",
            img: "./images/iconRecipe.png"
        },
        {
            name: "Register",
            img: "./images/iconAdmin.png"
        }
    ];

    for (const item of menu) {
        const div = document.createElement('div');
        const icon = document.createElement('img');
        const h3 = document.createElement('h3');
        const next = document.createElement('img');

        div.classList.add('secao');
        icon.src = item.img;
        h3.innerHTML = item.name;
        next.src = "./images/next.png";
        next.classList.add('next');

        div.addEventListener("click", () => {
            const event = new CustomEvent("pageChange", {detail: `/${item.name}Admin`});
    
            window.dispatchEvent(event);
        })
        
        div.appendChild(icon);
        div.appendChild(h3);
        div.appendChild(next);
        container.appendChild(div);
    }

    main.appendChild(h3);
    main.appendChild(container);

    return main;
}