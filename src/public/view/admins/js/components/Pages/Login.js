import Header from "../header/header.js"

export default function Login() {
    const root = document.getElementById('root');
    const divContent = document.createElement('div');
    const main = document.createElement('main');
    const image = document.createElement('img');
    const h3 = document.createElement('h3');
    const div = document.createElement('div');
    const inputUser = document.createElement('input');
    const inputPassword = document.createElement('input');
    const button = document.createElement('button');

    divContent.id = "login"
    image.src = "./images/logo.png";
    h3.innerHTML = "Setor Administrativo";
    inputUser.placeholder = "Usuário";
    inputPassword.placeholder = "Senha";
    button.innerHTML = "Entrar";
    root.innerHTML = ""

    button.addEventListener("click", () => {
        // const event = new CustomEvent("pageChange", {detail: "/Admin"})

        // window.dispatchEvent(event)
        const username = inputUser.value;
        const password = inputPassword.value;

        login(username,password)
    })

    div.appendChild(h3);
    div.appendChild(inputUser);
    div.appendChild(inputPassword);
    div.appendChild(button);

    main.appendChild(image);
    main.appendChild(div);
    divContent.appendChild(Header());
    divContent.appendChild(main);
    root.appendChild(divContent)



    return root
}

async function login(username, password) {
    try {
        const response = await fetch('http://localhost:3000/api/admin', {
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
            const event = new CustomEvent("pageChange", {detail: "/Admin"})

            window.dispatchEvent(event);
        }
    }
    catch(error) {
        console.error(`Erro na requisição: ${error}`)
    }
}