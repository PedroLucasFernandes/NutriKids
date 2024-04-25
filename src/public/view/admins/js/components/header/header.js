export default function Header() {
    const header = document.createElement('header');
    const div = document.createElement('div');
    const h2 = document.createElement('h2');
    const img = document.createElement('img');
    const h4 = document.createElement('h4');

    h2.innerHTML = "NutriKids";
    img.src = "./images/logo.png";
    h4.innerHTML = "Sair";

    h4.addEventListener("click", () => {
        const event = new CustomEvent("pageChange", {detail: "/Sair"});

        window.dispatchEvent(event);
    });

    div.appendChild(h2);
    div.appendChild(img);
    div.appendChild(h4);
    header.appendChild(div);
    
    return header;
}