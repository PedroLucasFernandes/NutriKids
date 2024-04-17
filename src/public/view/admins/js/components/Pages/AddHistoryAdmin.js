import Header from "../header/header.js";

export default function AddHistory() {
    const root = document.getElementById('root');
    root.innerHTML = "";

    const main = document.createElement('main');
    const h3 = document.createElement('h3');
    const divHistory = document.createElement('div');
    const h4Image = document.createElement('h4');
    const h4Title = document.createElement('h4');
    const h4Comics = document.createElement('h4');
    const h4History = document.createElement('h4');
    const inputFile = document.createElement('input');
    const inputTitle = document.createElement('input');
    const inputComics = document.createElement('input');
    const inputHistory = document.createElement('input')
    const buttonNewComics = document.createElement('button');
    const buttonAdd = document.createElement('button');
    const h4Back = document.createElement('h4');
    const divContent = document.createElement('div');

    h3.innerHTML = "Crie/Edite umma História";
    h4Image.innerHTML =  "Capa:";
    h4Title.innerHTML = "Título:";
    h4Comics.innerHTML = "Quadrinhos atuais:";
    h4History.innerHTML = "Historia:"
    inputFile.type = "file";
    buttonNewComics.innerHTML = "Novo quadrinho";
    buttonAdd.innerHTML = "Adicionar à platarforma";
    h4Back.innerHTML = "Voltar";
    divContent.id = "admin";
    divHistory.classList.add("divItens")

    divHistory.appendChild(buttonNewComics);

    main.appendChild(h3);
    main.appendChild(h4Image);
    main.appendChild(inputFile);
    main.appendChild(h4Title);
    main.appendChild(inputTitle);
    main.appendChild(h4Comics);
    main.appendChild(inputComics);
    main.appendChild(h4History);
    main.appendChild(inputHistory);
    main.appendChild(divHistory);
    main.appendChild(buttonAdd);
    main.appendChild(h4Back)

    divContent.appendChild(Header());
    divContent.appendChild(main);
    root.appendChild(divContent);

    return root;
}