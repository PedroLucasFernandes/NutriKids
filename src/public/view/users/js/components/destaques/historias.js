export default function historias() {
    const divMain = document.createElement('div')
    const img = document.createElement('img');
    const h3 = document.createElement('h3');
    const div = document.createElement('div');
    const divDestaque = document.createElement('div');
    const esquerdaH3 = document.createElement('h3');
    const direitaH3 = document.createElement('h3');
    const btnVerMais = document.createElement('button')

    img.src = "../../image/beterraba1.png";

    h3.innerHTML = "Historias em destaques:";

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

    divMain.classList.add("secao1")

    divDestaque.appendChild(h3);
    divDestaque.appendChild(div);
    divDestaque.appendChild(btnVerMais);

    divMain.appendChild(img);
    divMain.appendChild(divDestaque);

    return divMain;
}