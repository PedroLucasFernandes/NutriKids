import Header from "../header/header.js"
import Main from "../main/main.js"

export default function Inital() {
    const root = document.getElementById('root');
    root.innerHTML = ""

    const divContent = document.createElement('div');
    divContent.id = "admin"

    divContent.appendChild(Header());
    divContent.appendChild(Main());

    root.appendChild(divContent);

    return root;
}