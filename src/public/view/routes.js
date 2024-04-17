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

const router = {
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
};

function render(page) {
    router[page]();
}

function startRouter() {
    window.addEventListener("pageChange", (e) => {
        console.log(e.detail)
        window.history.pushState(undefined, undefined, e.detail)
        render(e.detail)
    })

    window.addEventListener("popstate", function(e){
        const newPage = window.location.pathname;
        
        render(newPage)
    })
}

export { startRouter }