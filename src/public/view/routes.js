import InitialUser from "./users/js/components/Pages/Initial.js";
import Home from "./users/js/components/Pages/Home.js";
import Quizzes from "./users/js/components/Pages/Quizzes.js";
import History from "./users/js/components/Pages/History.js";
import Recipes from "./users/js/components/Pages/Recipes.js";
import About from "./users/js/components/Pages/About.js";
import menuHamburguer from "./users/js/components/header/menuHamburguer.js";
import Initial from "./admins/js/components/Pages/Initial.js";
import Login from "./admins/js/components/Pages/Login.js";
import HistoryAdmin from "./admins/js/components/Pages/HistoryAdmin.js";
import AddHistory from "./admins/js/components/Pages/AddHistoryAdmin.js";
import QuizzesAdmin from "./admins/js/components/Pages/QuizzesAdmin.js";
import RecipesAdmin from "./admins/js/components/Pages/RecipesAdmin.js";
import Admins from "./admins/js/components/Pages/Admin.js";
import AddQuizzes from "./admins/js/components/Pages/AddQuizAdmin.js";

const router = {
    // "/": InitialUser,
    "/Inicio": Home,
    "/Main": Home,
    "/menuHamburguer": menuHamburguer,
    "/Quizzes": Quizzes,
    "/Historias": History,
    "/Receitas": Recipes,
    "/Sobre-nos": About,
    "/Administrativo": Login,
    "/Admin": Initial,
    "/Sair": Login,
    "/HistoryAdmin": HistoryAdmin,
    "/AddHistory": AddHistory,
    "/QuizzesAdmin": QuizzesAdmin,
    "/RecipesAdmin": RecipesAdmin,
    "/RegisterAdmin": Admins,
    "/AddQuizzes": AddQuizzes
};

function render(page) {
    router[page]();
}

function startRouter() {

    window.addEventListener('pageshow', function(event) {
        if (event.persisted) {
            console.log('A página foi recarregada.');
        } else {
            console.log('A página não foi recarregada.');
        }
    });

    window.addEventListener("pageChange", (e) => {
        console.log(e.detail)
        window.history.pushState(undefined, undefined, e.detail)

        render(e.detail)
    })

    window.addEventListener("popstate", function (e) {
        const newPage = window.location.pathname;

        render(newPage)
    })


    // ler o valor da URL e acionar a mudança de página
    const event = new CustomEvent("pageChange", { detail: location.pathname })

    window.dispatchEvent(event)
}

export { startRouter };