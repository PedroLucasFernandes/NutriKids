export default function ModalQuiz(item, resp) {
    const modal = document.createElement('div');
    const modalContent= document.createElement('div');
    const h3 = document.createElement('h3'); 
    const close = document.createElement('h2');
    const button = document.createElement('button');
    const div = document.createElement('div');
    const p = document.createElement('p')

    h3.innerHTML = resp;
    close.innerHTML = "X";
    button.innerHTML = "Ir para a próxima pergunta";
    modal.id = "modal";
    modalContent.id = "modal-content";
    p.innerHTML = item.explanation;

    div.appendChild(p);

    modalContent.appendChild(close);
    modalContent.appendChild(h3);
    modalContent.appendChild(p);
    modalContent.appendChild(button);

    modal.appendChild(modalContent);

    close.addEventListener("click", function() {
        modal.innerHTML = "";
        modal.style.display = "none";
    });

    button.addEventListener('click', function() {
        modal.innerHTML = "";
        modal.style.display = "none";
    });

    return modal;
}