import Header from "../header/header.js";
import Main from "../main/main.js";

export default function Inital() {
    const root = document.getElementById('root');
    root.innerHTML = "";
    const test = document.getElementById('css');
    test.href = "../../../../../css/Admin/Admin.css";

    root.appendChild(Header());
    root.appendChild(Main());

    return root;
}