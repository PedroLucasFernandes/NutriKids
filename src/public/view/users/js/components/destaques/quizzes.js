import playQuiz from "../Pages/playQuizzes.js";

export default function quizzes() {
    const divMain = document.createElement('div');
    const img = document.createElement('img');
    const h3 = document.createElement('h3');
    const div = document.createElement('div');
    const divDestaque = document.createElement('div');
    const btnVerMais = document.createElement('button');

    img.src = "./images/couve1.png";

    h3.innerHTML = "Quizzes em destaques:";

    divDestaque.classList.add("conjunto");
    div.classList.add("destaques");

    div.id = "couve";

    for (let i = 0; i < 2; i++) {
        // const quadrado = document.createElement('div');
        // quadrado.classList.add("quadrado");
        // div.appendChild(quadrado);

        getQuiz(i)
    }

    btnVerMais.innerHTML = "Ver mais!";

    divMain.classList.add("secao2");

    divDestaque.appendChild(h3);
    divDestaque.appendChild(div);
    divDestaque.appendChild(btnVerMais);

    divMain.appendChild(img);
    divMain.appendChild(divDestaque);

    btnVerMais.addEventListener("click", () => {
        const event = new CustomEvent("pageChange", {detail: "/Quizzes"});
        const main = document.querySelector("main");

        main.innerHTML = "";

        window.dispatchEvent(event);
    });

    return divMain;
}

async function getQuiz(i) {
    try {
        const response = await fetch(`http://localhost:3000/api/quiz/`);

        if (!response.status) {
            throw new Error('Erro na requisição');
        }

        const data = await response.json();
        console.log(data);

        render(data[i]);
    }
    catch (error) {
        console.error(`Erro na requisição: ${error}`);
    }
}

function render(data) {
    console.log(data);

    const divtest = document.getElementById('couve');

    const div = document.createElement("div");
    div.classList.add("box");

    const title = document.createElement("h3");
    const img = document.createElement("img");

    console.log(data);
    console.log(data.title);
    title.innerHTML = data.title;
    title.style.fontSize = "15px";
    img.src = `./uploads/${data.image_path}`;

    div.addEventListener('click', function () {
        console.log(data);
        playQuiz(data);
    });

    div.appendChild(title);
    div.appendChild(img);

    divtest.appendChild(div)
}