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
    const p2 = document.createElement('p');
    const p3 = document.createElement('p');
    const p4 = document.createElement('p');
    const p5 = document.createElement('p');
    const h3 = document.createElement('h3');
    const img = document.createElement('img');
    
    const menu = ["Inicio", "Jogos", "Quizzes", "Receitas"];
    div.id = "div"
    
    h3.innerHTML = "Sobre nós:"
    
    p.id = "aboutUsP";
    p2.id = "aboutUsP";
    p3.id = "aboutUsP";
    p4.id = "aboutUsP";
    p5.id = "aboutUsP";
    p.innerHTML = "Somos um site de nutrição infantil e de classificação livre, com o objetivo de proporcionar uma experiência divertida e educativa para crianças entre 5 a 12 anos."
    p2.innerHTML = "Oferecemos uma variedade de receitas saudáveis e deliciosas, jogos interativos para aprender sobre alimentos de maneira divertida, quizzes para testar o conhecimento sobre o tema e histórias encantadoras que destacam a importância de uma alimentação equilibrada.";
    p3.innerHTML = "Estamos comprometidos em ajudar as crianças a desenvolverem hábitos alimentares saudáveis desde cedo, de forma envolvente e acessível. Promovemos um ambiente inclusivo e acolhedor, onde não há espaço para discriminação ou preconceito.";
    p4.innerHTML = "Acreditamos na importância da diversidade e respeitamos todas as crianças, independentemente de sua origem étnica ou religiosa. Oferecemos uma experiência positiva e enriquecedora para todas as crianças, incentivando a igualdade e o respeito mútuo.";
    p5.innerHTML = "Estamos comprometidos em criar um espaço seguro e inclusivo para que todas as crianças possam aprender, crescer e se divertir juntas.";
    
    img.src = "./images/beterraba3.png"

    div.appendChild(h3);
    div.appendChild(p);
    div.appendChild(p2);
    div.appendChild(p3);
    div.appendChild(p4);
    div.appendChild(p5);
    main.appendChild(img);
    main.appendChild(div);

    root.appendChild(header(menu));
    root.appendChild(main);
    root.appendChild(footer());

    return root

}