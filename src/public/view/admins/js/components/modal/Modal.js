export default function Modal() {
    const modal = document.createElement('div');
    const modalContent= document.createElement('div');
    const h3 = document.createElement('h3'); 
    const question = document.createElement('h4');
    const questionInput = document.createElement('input')
    const explanation = document.createElement('h4');
    const inputExplanation = document.createElement('input');
    const close = document.createElement('h2');
    const button = document.createElement('button');

    h3.innerHTML = "Nova pergunta";
    question.innerHTML = "Questão:";
    explanation.innerHTML = "Explicação";
    close.innerHTML = "X";
    button.innerHTML = "Adicionar ao quiz";

    modalContent.appendChild(question);
    modalContent.appendChild(questionInput);


    for (let i = 0; i < 4; i++) {
        const answers = document.createElement('h4');
        const input = document.createElement('input');
        const check = document.createElement('input');
        const p = document.createElement('p');
        
        check.type = "checkbox";
        
        answers.innerHTML = "Resposta";
        h4.innerHTML = "Gabarito";

        modalContent.appendChild(answers);
        modalContent.appendChild(input);
        modalContent.appendChild(check);
        modalContent.appendChild(h4);
    }

    modalContent.appendChild(explanation);
    modalContent.appendChild(inputExplanation);
    modal.appendChild(modalContent);

    return modal;
}