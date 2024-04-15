import Initial from "./users/js/components/Pages/Initial.js"

import {startRouter} from "./routes.js"

const root = document.getElementById('root');

root.appendChild(Initial());

startRouter()