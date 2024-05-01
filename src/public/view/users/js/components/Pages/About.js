import header from "../header/header.js";
import footer from "../footer/footer.js";

export default function About() {
    const root = document.getElementById('root');
    root.innerHTML = "";
    const styleCss = document.getElementById('css')
    styleCss.href = "../../../../../css/User/Secao.css";

    const main = document.createElement('main');
    const div = document.createElement('div');
    const p = document.createElement('p');
    const h3 = document.createElement('h3');
    const img = document.createElement('img');

    const menu = ["Inicio", "Jogos", "Quizzes", "Receitas"];
    div.id = "div"

    h3.innerHTML = "Sobre nós:"

    p.innerHTML = "No nosso site de nutrição infantil, proporcionamos uma experiência divertida e educativa para crianças entre 5 a 12 anos. Oferecemos uma variedade de receitas saudáveis e deliciosas, jogos interativos para aprender sobre comida de maneira divertida, quizzes para testar o conhecimento sobre nutrição e histórias encantadoras que destacam a importância de uma alimentação equilibrada. Estamos comprometidos em ajudar as crianças a desenvolverem hábitos alimentares saudáveis desde cedo, de forma envolvente e acessível.No nosso site de nutrição infantil, promovemos um ambiente inclusivo e acolhedor, onde não há espaço para discriminação ou preconceito. Acreditamos na importância da diversidade e respeitamos todas as crianças, independentemente de sua origem étnica, religião. Nosso objetivo é oferecer uma experiência positiva e enriquecedora para todas as crianças, incentivando a igualdade e o respeito mútuo. Estamos comprometidos em criar um espaço seguro e inclusivo para que todas as crianças possam aprender, crescer e se divertir juntas."

    img.src = "./images/beterraba3.png"

    div.appendChild(h3);
    div.appendChild(p);
    main.appendChild(img);
    main.appendChild(div);

    root.appendChild(header(menu));
    root.appendChild(main);
    root.appendChild(footer());

    return root

}