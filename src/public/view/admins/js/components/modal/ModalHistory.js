export default function ModalHistory(arrayImg) {
    const modal = document.createElement('div');
    const modalContent= document.createElement('div');
    const h3 = document.createElement('h3'); 
    const input = document.createElement('input');
    const div = document.createElement('div');
    const close = document.createElement('h2');
    const button = document.createElement('button');

    h3.innerHTML = "Envie um novo quadrinho";
    input.type = "file";
    close.innerHTML = "X";
    button.innerHTML = "Confirmar";
    input.id = "image";
    input.accept = "image/*";
    // input.multiple = true
    modal.id = "modal";
    div.id = "box";
    modalContent.id = "modal-content";

    modalContent.appendChild(close);
    modalContent.appendChild(h3);
    modalContent.appendChild(input)
    modalContent.appendChild(div);
    modalContent.appendChild(button);

    modal.appendChild(modalContent);

    input.addEventListener("change", function(e) {
        const inputTarget = e.target;
        const file = inputTarget.files[0];

        if(file){
            const reader = new FileReader();

            reader.addEventListener('load', function(e){
                const readerTarget = e.target;

                const img = document.createElement('img');
                img.src = readerTarget.result;
                img.id = "img";
            
                const box = document.getElementById('box');
                console.log(img);
                box.appendChild(img);
            })
            reader.readAsDataURL(file);
            console.log(file);
            arrayImg.push(file);
            console.log(arrayImg);
        }

        console.log(file);
    })

    close.addEventListener("click", function() {
        modal.innerHTML = "";
        modal.style.display = "none";
    });

    button.addEventListener('click', function() {
        const img = document.getElementById('img');
        const boxImage = document.createElement('img');
        const divAddImage = document.createElement('div');
        const div = document.getElementById('div-image');

        boxImage.src = img.src;
        divAddImage.appendChild(boxImage);
        div.appendChild(divAddImage);

        
        modal.innerHTML = "";
        modal.style.display = "none";
        console.log(arrayImg);
    });

    return modal;
}



