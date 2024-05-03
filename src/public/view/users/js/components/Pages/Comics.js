export default function comicsMain(comic) {
    const main = document.getElementById('main');
    main.innerHTML = "";
    const test = document.getElementById('css');
    test.href = "../../../../../css/User/mainHistory.css";

    const h3Title = document.createElement('h3');
    const div = document.createElement('div');
    const img = document.createElement('img');
    const h4Count = document.createElement('h4');
    const h4Back = document.createElement('h4');
    h4Back.id = "backButton";
    const h4next = document.createElement('h4');
    h4next.id = "nextButton";
    const h4prev = document.createElement('h4');
    h4prev.id = "prevButton";
    const divImage = document.createElement('div');

    let currentIndex = 0;
    const comicsBox = comic.comics;

    h3Title.innerHTML = comic.title;
    h4next.innerHTML = ">";
    h4prev.innerHTML = "<";
    h4Count.innerHTML = `Quadrinho: ${currentIndex + 1} de ${comicsBox.length}`;
    h4Back.innerHTML = "Voltar";

    img.src = `./uploads/${comicsBox[0].image_path}`;
    div.appendChild(img);

    divImage.appendChild(h4prev);
    divImage.appendChild(div);
    divImage.appendChild(h4next);

    h4next.addEventListener('click', function () {
        if (currentIndex === comicsBox.length - 1) {
            currentIndex = 0;
        } else {
            currentIndex++;
        }

        const imageObj = comicsBox[currentIndex];
        img.src = `./uploads/${imageObj.image_path}`;
        h4Count.innerHTML = `Quadrinho: ${currentIndex + 1} de ${comicsBox.length}`;
    });

    h4prev.addEventListener('click', function () {
        if (currentIndex === 0) {
            currentIndex = comicsBox.length - 1;
        } else {
            currentIndex--;
        }

        const imageObj = comic.comics[currentIndex];
        img.src = `./uploads/${imageObj.image_path}`;
        h4Count.innerHTML = `Quadrinho: ${currentIndex + 1} de ${comicsBox.length}`;
    });

    let scaled = false;
    img.addEventListener('click', function () {
        if (scaled) {
            img.style.transform = "scale(1)";
        } else {
            img.style.transform = "scale(1.6)";
        }
        scaled = !scaled;
    });

    h4Back.addEventListener("click", () => {
        const event = new CustomEvent("pageChange", { detail: "/Historias" });
        window.dispatchEvent(event);
    });

    main.appendChild(h3Title);
    main.appendChild(divImage);
    main.appendChild(h4Count);
    main.appendChild(h4Back);

    return main;
}
