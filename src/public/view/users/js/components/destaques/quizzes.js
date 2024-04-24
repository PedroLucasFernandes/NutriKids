export default function quizzes() {
    const divMain = document.createElement('div')
    const img = document.createElement('img');
    const h3 = document.createElement('h3');
    const div = document.createElement('div');
    const divDestaque = document.createElement('div');
    const esquerdaH3 = document.createElement('h3');
    const direitaH3 = document.createElement('h3');
    const btnVerMais = document.createElement('button')

    img.src = "./images/couve1.png";

    h3.innerHTML = "Quizzes em destaques:";

    divDestaque.classList.add("conjunto");
    div.classList.add("destaques");

    esquerdaH3.innerHTML = "<";
    div.appendChild(esquerdaH3);

    for (let i = 0; i < 2; i++) {
        const quadrado = document.createElement('div');
        quadrado.classList.add("quadrado");
        div.appendChild(quadrado);
    }

    direitaH3.innerHTML = ">";
    div.appendChild(direitaH3);

    btnVerMais.innerHTML = "Ver mais!";

    divMain.classList.add("secao2")

    divDestaque.appendChild(h3);
    divDestaque.appendChild(div);
    divDestaque.appendChild(btnVerMais);

    divMain.appendChild(img);
    divMain.appendChild(divDestaque);

    btnVerMais.addEventListener("click", () => {
        const event = new CustomEvent("pageChange", {detail: "/Quizzes"})
        const main = document.querySelector("main");

        main.innerHTML = "";

        window.dispatchEvent(event)
    })

    return divMain;
}