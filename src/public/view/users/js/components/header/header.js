export default function header(menu) {
    const header = document.createElement('header');
    const nav = document.createElement('nav');
    const img = document.createElement('img');
    const menuImg = document.createElement('img')
    const h2 = document.createElement('h2');
    const ul = document.createElement('ul');

    menuImg.src = "./images/menu.png"
    menuImg.id = "menu";

    img.src = "./images/logo.png"
    img.id = "logo"
    h2.innerHTML = "NutriKids"

    for (const item of menu){
        const li = document.createElement('li');
        li.innerHTML = item

        li.addEventListener("click", ()=> {
            const event = new CustomEvent("pageChange", {detail: `/${item}`});

            window.dispatchEvent(event)
        })

        ul.appendChild(li);
    }

    nav.appendChild(menuImg)
    nav.appendChild(img);
    nav.appendChild(h2);
    nav.appendChild(ul);
    header.appendChild(nav);

    menuImg.addEventListener("click", () => {
        const event = new CustomEvent("pageChange", {detail: "/menuHamburguer"});

        console.log(event.detail);
        document.getElementById("root").innerHTML = ""

        window.dispatchEvent(event)
    });

    return header;
};