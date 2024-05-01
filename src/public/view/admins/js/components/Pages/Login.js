import Header from "../header/header.js";

export default function Login() {
    const root = document.getElementById('root');
    root.innerHTML = "";
    const test = document.getElementById('css');
    test.href = "../../../../../css/Admin/Login.css";

    const divContent = document.createElement('div');
    const main = document.createElement('main');
    const image = document.createElement('img');
    const h3 = document.createElement('h3');
    const div = document.createElement('div');
    const inputUser = document.createElement('input');
    const inputPassword = document.createElement('input');
    const form = document.createElement('form');
    const button = document.createElement('button');
    const footer = document.createElement('footer');

    divContent.id = "login";
    image.src = "./images/logo.png";
    h3.innerHTML = "Setor Administrativo";
    inputUser.placeholder = "Usuário";
    inputPassword.placeholder = "Senha";
    inputPassword.type = "password";
    button.innerHTML = "Entrar";
    footer.innerHTML = "<a>Usuário</a>";

    form.appendChild(inputUser);
    form.appendChild(inputPassword);
    form.appendChild(button);
    

    form.addEventListener("submit", (e) => {
        // const event = new CustomEvent("pageChange", {detail: "/Admin"})

        // window.dispatchEvent(event)
        e.preventDefault();
        const username = inputUser.value;
        const password = inputPassword.value;

        login(username,password);
    })

    footer.addEventListener("click", function() {
        root.innerHTML = ""
        const event = new CustomEvent("pageChange", {detail: "/"});

            window.dispatchEvent(event);
    })

    div.appendChild(h3);
    div.appendChild(form);

    main.appendChild(image);
    main.appendChild(div);
    root.appendChild(Header());
    root.appendChild(main);
    root.appendChild(footer);



    return root;
}

async function login(username, password) {
    try {
        const apiUrl = window.location.hostname === 'alpha01.alphaedtech.org.br'
               ? 'https://alpha01.alphaedtech.org.br'
               : 'http://localhost:3000';
        
        const response = await fetch(`${apiUrl}/api/admin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password })
        });
        const data = await response.json();
        if (data.error) {
            alert(data.error);
            document.cookie = "";
        }
        else {
            const event = new CustomEvent("pageChange", {detail: "/Admin"});

            window.dispatchEvent(event);
        }
    }
    catch(error) {
        console.error(`Erro na requisição: ${error}`);
    }
}