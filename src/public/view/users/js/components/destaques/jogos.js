export default function jogos() {
    const divMain = document.createElement('div')
    const img = document.createElement('img');
    const h3 = document.createElement('h3');
    const div = document.createElement('div');
    const divDestaque = document.createElement('div');
    const esquerdaH3 = document.createElement('h3');
    const direitaH3 = document.createElement('h3');
    const btnVerMais = document.createElement('button');

    img.src = "./images/cereja1.png";

    h3.innerHTML = "Jogos em destaques:";

    div.classList.add("destaques");
    divDestaque.classList.add("conjunto");

    for (let i = 0; i < 2; i++) {
        const quadrado = document.createElement('div');
        quadrado.classList.add("quadrado");
        div.appendChild(quadrado);
    }

    btnVerMais.innerHTML = "Ver mais!";

    divMain.classList.add("secao1");

    divDestaque.appendChild(h3);
    divDestaque.appendChild(div);
    divDestaque.appendChild(btnVerMais);

    divMain.appendChild(img);
    divMain.appendChild(divDestaque);

    btnVerMais.addEventListener("click", () => {
        const event = new CustomEvent("pageChange", {detail: "/Jogos"});
        const main = document.querySelector("main");

        main.innerHTML = "";

        window.dispatchEvent(event);
    });

    return divMain;
}