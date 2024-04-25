import {startRouter} from "./routes.js";
import Initial from "./users/js/components/Pages/Initial.js";

window.history.replaceState(undefined, undefined, "/");

startRouter();  
Initial();