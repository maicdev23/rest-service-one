import { Router } from "express";

import { addMovie, getMovies } from '../controllers/movie.controller.js';

const rutas = Router()

rutas.post('/add-movie', addMovie)
rutas.get('/get-movie', getMovies)

export default rutas