import Header from "../header/header.js";
import ModalHistory from "../modal/ModalHistory.js";

export default function AddHistory() {
    const test = document.getElementById('css');
    test.href = "../../../../../css/Admin/Add.css"
    const root = document.getElementById('root');
    root.innerHTML = "";

    const main = document.createElement('main');
    const h3 = document.createElement('h3');
    const divHistory = document.createElement('div');
    const h4Image = document.createElement('h4');
    const imageButton = document.createElement('button')
    const h4Title = document.createElement('h4');
    const h4Comics = document.createElement('h4');
    const h4History = document.createElement('h4');
    const inputFile = document.createElement('input');
    const inputTitle = document.createElement('input');
    const inputHistory = document.createElement('textarea')
    const buttonNewComics = document.createElement('button');
    const buttonAdd = document.createElement('button');
    const h4Back = document.createElement('h4');
    const divContent = document.createElement('div');
    const divAddImage = document.createElement('div');
    const form = document.createElement('form');

    h3.innerHTML = "Crie/Edite umma História";
    h4Image.innerHTML = "Capa:";
    h4Title.innerHTML = "Título:";
    h4Comics.innerHTML = "Quadrinhos atuais:";
    h4History.innerHTML = "Historia:"
    inputFile.type = "file";
    buttonNewComics.innerHTML = "novo quadrinho"
    divAddImage.id = "image"
    buttonNewComics.accept = "image/*"
    buttonNewComics.multiple = true
    buttonAdd.innerHTML = "Adicionar à platarforma";
    h4Back.innerHTML = "Voltar";
    divContent.id = "admin";
    divHistory.innerHTML = "Insira uma capa primeiro"
    divHistory.classList.add("divItens")
    divAddImage.id = "div-image";

    form.appendChild(h4Image);
    form.appendChild(inputFile);
    form.appendChild(h4Title);
    form.appendChild(inputTitle);
    form.appendChild(h4History);
    form.appendChild(inputHistory);
    form.appendChild(h4Comics);
    form.appendChild(divHistory);
    form.appendChild(buttonAdd);

    main.appendChild(form)
    main.appendChild(h4Back)

    const arrayImg = []

    inputFile.addEventListener("change", function (e) {
        divHistory.innerHTML = ""

        const inputTarget = e.target;
        const file = inputTarget.files[0];

        arrayImg.push(file)
        console.log(arrayImg)

        divHistory.appendChild(divAddImage);
        divHistory.appendChild(buttonNewComics);
    })

    buttonNewComics.addEventListener("click", function (e) {
        e.preventDefault()
        root.appendChild(ModalHistory(arrayImg));
    })

    buttonAdd.addEventListener("click", function (e) {
        e.preventDefault()
        const title = inputTitle.value;
        const history = inputHistory.value;

        const formData = new FormData();
        formData.append("title", inputTitle.value)
        formData.append("story", inputHistory.value)
        formData.append("created_by", "Admin1")
        formData.append("updated_by", "Admin1")
        formData.append("file", arrayImg)
        
        console.log(formData.entries());

        addHistory(formData)
    })

    h4Back.addEventListener("click", function () {
        const event = new CustomEvent("pageChange", { detail: "/HistoryAdmin" })

        window.dispatchEvent(event)
    })

    divContent.appendChild(Header());
    divContent.appendChild(main);
    root.appendChild(divContent);

    return root;
}

async function addHistory(formData) {
    console.log(formData)
    // try {
    //     const response = await fetch('http://localhost:3000/api/history', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({ title: title, story: story, created_by: "admin1", updated_by: "admin1" })
    //     });

    //     if (!response.status) {
    //         throw new Error('Erro na requisição');
    //     }

    //     const data = await response.json();
    //     console.log(data)
    // }
    // catch (error) {
    //     console.error(`Erro na requisição: ${error}`)
    // }

    try {
        const contentType = 'multipart/form-data; boundary=' + formData.boundary;

        const response = await fetch('http://localhost:3000/api/history', {
            method: 'POST',
            body: formData,
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })

        if (!response.status) {
            throw new Error('Erro na requisição');
        }

        const data = await response.json();
        console.log(data)
    }
    catch (error) {
        console.error(`Erro na requisição: ${error}`)
    }
}