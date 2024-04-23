export default function ModalQuizzes() {
    const modal = document.createElement('div');
    const modalContent= document.createElement('div');
    const h3 = document.createElement('h3'); 
    const h4Question = document.createElement('h4');
    const inputQuestion = document.createElement('input');
    const h4explication = document.createElement('h4');
    const inputExplication = document.createElement('textarea') 
    const close = document.createElement('h2');
    const button = document.createElement('button');

    h3.innerHTML = "Nova pergunta";
    close.innerHTML = "X";
    button.innerHTML = "Adicionar ao quiz";
    modal.id = "modal"
    modalContent.id = "modal-content"
    h4Question.innerHTML = "Questão:";
    h4explication.innerHTML = "Explicação"

    modalContent.appendChild(close);
    modalContent.appendChild(h3);
    modalContent.appendChild(h4Question);
    modalContent.appendChild(inputQuestion);

    for (let i = 1; i <= 4; i++) {
        const div = document.createElement('div');
        const h4Resp = document.createElement('p');
        const inputResp = document.createElement('input');
        const check = document.createElement('input');
        const gabarito = document.createElement('p')

        h4Resp.innerHTML = "Resposta:";
        check.type = "checkbox";
        check.id = `resp${i}`
        gabarito.innerHTML = "Gabarito"

        div.appendChild(h4Resp);
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
        modal.style.display = "none"
    })

    button.addEventListener('click', function() {
        modal.innerHTML = "";
        modal.style.display = "none"
    })

    return modal
}