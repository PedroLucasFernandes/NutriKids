export default function ModalAdmin() {
    const modal = document.createElement('div');
    const modalContent= document.createElement('div');
    const h3 = document.createElement('h3'); 
    const h4Name = document.createElement('h4');
    const inputName = document.createElement('input');
    const h4Login = document.createElement('h4');
    const inputLogin = document.createElement('input')
    const h4Password = document.createElement('h4');
    const inputPassword = document.createElement('input') 
    const close = document.createElement('h2');
    const button = document.createElement('button');

    h3.innerHTML = "NOvo Administrador";
    close.innerHTML = "X";
    button.innerHTML = "Criar novo admin";
    modal.id = "modal"
    modalContent.id = "modal-content"
    h4Name.innerHTML = "Nome:";
    h4Login.innerHTML = "Login:"
    h4Password.innerHTML = "Senha:"

    modalContent.appendChild(close);
    modalContent.appendChild(h3);
    modalContent.appendChild(h4Name);
    modalContent.appendChild(inputName);
    modalContent.appendChild(h4Login);
    modalContent.appendChild(inputLogin);
    modalContent.appendChild(h4Password);
    modalContent.appendChild(inputPassword);
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