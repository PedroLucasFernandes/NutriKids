import {startRouter} from "./routes.js";
import Initial from "./users/js/components/Pages/Initial.js";

window.history.replaceState(undefined, undefined, "/");

// window.history.replaceState(undefined, undefined, "/")

const root = document.getElementById('root');

// root.appendChild(Initial());

// Initial()

// window.location.reload()
console.log(window.location.href)
startRouter()
