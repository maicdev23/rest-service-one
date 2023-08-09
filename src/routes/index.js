import { Router } from "express";

import user from "./users.routes.js";
import movie from "./movie.routes.js";

const rutas = Router()

rutas.use('/', user, movie)

export default rutas