export default function ModalQuizzes(arrayQuestions, updateQuizzesDiv) {
    let correctAnswer;
    const modal = document.createElement('div');
    const modalContent= document.createElement('div');
    const h3 = document.createElement('h3'); 
    const h4Question = document.createElement('h4');
    const inputQuestion = document.createElement('input');
    const h4explication = document.createElement('h4');
    const inputExplication = document.createElement('textarea');
    const close = document.createElement('h2');
    const button = document.createElement('button');
    
    h3.innerHTML = "Nova pergunta";
    close.innerHTML = "X";
    button.innerHTML = "Adicionar ao quiz";
    modal.id = "modal";
    modalContent.id = "modal-content";
    h4Question.innerHTML = "Questão:";
    h4explication.innerHTML = "Explicação";
    inputExplication.id = "inputExplication";

    modalContent.appendChild(close);
    modalContent.appendChild(h3);
    modalContent.appendChild(h4Question);
    modalContent.appendChild(inputQuestion);

    for (let i = 1; i <= 4; i++) {
        const div = document.createElement('div');
        div.id = "divAnswer";
        const pResp = document.createElement('p');
        const inputResp = document.createElement('input');
        const check = document.createElement('input');
        const gabarito = document.createElement('p');

        pResp.innerHTML = "Resposta:";
        inputResp.id = `option${i}`;
        check.type = "checkbox";
        check.id = `resp${i}`;
        gabarito.innerHTML = "Gabarito";

        check.addEventListener('click', function() {
            if (this.checked) {
                for (let j = 1; j <= 4; j++) {
                    if (j !== i) {
                        correctAnswer = i;
                        document.getElementById(`resp${j}`).checked = false;
                    }
                }
            }
        });

        div.appendChild(pResp);
        div.appendChild(inputResp);
        div.appendChild(check);
        div.appendChild(gabarito);

        modalContent.appendChild(div);
    }

    modalContent.appendChild(h4explication);
    modalContent.appendChild(inputExplication);
    modalContent.appendChild(button);

    modal.appendChild(modalContent);

    close.addEventListener("click", function() {
        modal.innerHTML = "";
        modal.style.display = "none";
    });

    button.addEventListener("click", async function (e) {
        e.preventDefault();

        const option1 = document.getElementById("option1").value;
        const option2 = document.getElementById("option2").value;
        const option3 = document.getElementById("option3").value;
        const option4 = document.getElementById("option4").value;

        const question = {
            question_text: inputQuestion.value,
            option_1: option1,
            option_2: option2,
            option_3: option3,
            option_4: option4,
            answer: correctAnswer,
            explanation: inputExplication.value
        };

        try {
            arrayQuestions.push(question);
            updateQuizzesDiv();
        } catch (error) {
            console.error(`Erro em adicionar pergunta: ${error}`);
        }
        modal.innerHTML = "";
        modal.style.display = "none";
    });

    return modal;
}