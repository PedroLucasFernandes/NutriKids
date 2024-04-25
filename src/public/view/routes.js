import InitialUser from "./users/js/components/Pages/Initial.js";
import Home from "./users/js/components/Pages/Home.js";
import Games from "./users/js/components/Pages/Game.js";
import Quizzes from "./users/js/components/Pages/Quizzes.js";
import History from "./users/js/components/Pages/History.js";
import Recipes from "./users/js/components/Pages/Recipes.js";
import menuHamburguer from "./users/js/components/header/menuHamburguer.js";
import Inital from "./admins/js/components/Pages/Initial.js";
import Login from "./admins/js/components/Pages/Login.js";
import HistoryAdmin from "./admins/js/components/Pages/HistoryAdmin.js";
import AddHistory from "./admins/js/components/Pages/AddHistoryAdmin.js";
import QuizzesAdmin from "./admins/js/components/Pages/QuizzesAdmin.js";
import RecipesAdmin from "./admins/js/components/Pages/RecipesAdmin.js";
import Admins from "./admins/js/components/Pages/Admin.js";
import AddQuizzes from "./admins/js/components/Pages/AddQuizAdmin.js";

const router = {
    "/": InitialUser,
    "/Inicio": Home,
    "/Main": Home,
    "/menuHamburguer": menuHamburguer,
    "/Jogos": Games,
    "/Quizzes": Quizzes,
    "/Historias": History,
    "/Receitas": Recipes,
    "/Login": Login,
    "/Admin": Inital,
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
    // window.location.reload(test())

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

function test() {
    console.log(e.detail)
    window.history.pushState(undefined, undefined, e.detail)

    render(e.detail)
}

export { startRouter };