import header from "./components/header/header.js";
import main from "./components/main/main.js";
import footer from "./components/footer/footer.js";

const root = document.getElementById('root');

root.appendChild(header());
root.appendChild(main());
root.appendChild(footer());