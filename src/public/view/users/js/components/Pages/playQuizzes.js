// import ModalQuiz from "../modal/modalQuiz.js";

export default function playQuiz(quiz) {
    const main = document.getElementById('main');
    main.innerHTML = "";
    const test = document.getElementById('css');
    test.href = "../../../../../css/User/Quiz.css";

    console.log(quiz)

    const h3Title = document.createElement('h3');
    const div = document.createElement('div');
    const img = document.createElement('img');
    const h4Back = document.createElement('h4');
    h4Back.id = "backButton";
    const divImage = document.createElement('div');
    const divBox = document.createElement('div');
    const h4Count = document.createElement('h4')

    h3Title.innerHTML = quiz.title;
    h4Back.innerHTML = "Voltar";
    divImage.id = "img";
    h3Title.id = "title"

    img.src = `./uploads/${quiz.image_path}`;

    const question = quiz.questions;

    console.log(question)

    let currentIndex = 0;

    main.appendChild(h3Title);
    main.appendChild(divImage);
    main.appendChild(divBox);

    opitionQuestion(question[currentIndex], question)

    div.appendChild(img);

    divImage.appendChild(div);

    h4Back.addEventListener("click", () => {
        const event = new CustomEvent("pageChange", { detail: "/Quizzes" });

        window.dispatchEvent(event);
    });

    main.appendChild(h4Count)

    return main;
}

let currentIndex = 0;
let count = 0
let countBtn = 1;

function opitionQuestion(item, question) {
    const arrayBtn = [item.option_1, item.option_2, item.option_3, item.option_4];
    const main = document.getElementById('main');
    const root = document.getElementById('root');

    const div = document.createElement('div');
    const h3 = document.createElement('h3');
    const buttonConfirm = document.createElement('button');
    const h4Back = document.createElement('h4');
    const h4Count = document.createElement('h4')


    h4Count.innerHTML = `Pergunta: ${currentIndex + 1} de ${question.length}`;
    currentIndex++

    let answer = 0

    h3.innerHTML = item.question_text;
    buttonConfirm.innerHTML = "Confirmar Resposta";
    div.id = "div";
    h4Back.innerHTML = "Voltar";
    h3.id = "question";
    buttonConfirm.id = "button";

    for (let i = 0; i <= 3; i++) {
        const button = document.createElement('button');

        button.innerHTML = arrayBtn[i]

        button.id = i + 1

        if (button.id === 1) {
            button.classList.add("marcado");
        }

        button.addEventListener('click', function () {

            marcar(button.id)
            answer = button.id;
            console.log(answer)
        })

        div.appendChild(button);
    }

    buttonConfirm.addEventListener("click", function (e) {
        e.preventDefault();
        let resposta = ""

        if (parseInt(answer) === item.answer) {
            resposta = "Você acertou!"
            count++
        }
        else {
            resposta = "Você errou!"
        }

        console.log(item)
        root.appendChild(ModalQuiz(item, resposta, question, count));
    });

    h4Back.addEventListener('click', function () {
        const event = new CustomEvent("pageChange", { detail: "/Quizzes" });

        index = 1
        currentIndex = 0;
        count = 0

        window.dispatchEvent(event);
    })

    main.appendChild(h3);
    main.appendChild(div);
    main.appendChild(h4Count);
    main.appendChild(buttonConfirm);
    main.appendChild(h4Back);
}

let index = 1


function ModalQuiz(item, resp, question, points) {
    const modal = document.createElement('div');
    const modalContent = document.createElement('div');
    const h3 = document.createElement('h3');
    const close = document.createElement('h2');
    const button = document.createElement('button');
    const div = document.createElement('div');
    const p = document.createElement('p')
    const main = document.getElementById('main');

    h3.innerHTML = resp;
    close.innerHTML = "X";
    button.innerHTML = "Ir para a próxima pergunta";
    modal.id = "modal";
    modalContent.id = "modal-content";
    p.innerHTML = item.explanation;

    index++

    div.appendChild(p);

    modalContent.appendChild(close);
    modalContent.appendChild(h3);
    modalContent.appendChild(p);
    modalContent.appendChild(button);

    modal.appendChild(modalContent);

    if (index === question.length) {
        main.innerHTML = ""

        const back = document.createElement('h4');
        const image = document.createElement('img');
        h3.innerHTML = `Você acertou ${points} questões!!!`;
        back.innerHTML = "Voltar";
        image.src = "./images/Couve3.png"

        back.addEventListener("click", () => {
            const event = new CustomEvent("pageChange", { detail: "/Quizzes" });

            index = 1
            currentIndex = 0;
            count = 0

            window.dispatchEvent(event);
        });

        main.appendChild(image);
        main.appendChild(h3);
        main.appendChild(back);

        return;
    }

    close.addEventListener("click", function () {
        modal.innerHTML = "";
        modal.style.display = "none";
        main.innerHTML = ""
        console.log(index);
        opitionQuestion(question[index], question)
    });

    button.addEventListener('click', function () {
        modal.innerHTML = "";
        modal.style.display = "none";
        main.innerHTML = ""
        console.log(index);
        opitionQuestion(question[index], question)
    });

    return modal;
}

function marcar(escolha) {
    document.getElementById(`${countBtn}`).classList.remove("marcado");
    
    document.getElementById(`${escolha}`).classList.add("marcado");

    countBtn = escolha; 
};