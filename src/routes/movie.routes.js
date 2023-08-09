import { Router } from "express";

import multer from '../middlewares/uploadFile.js'

import * as movie from '../controllers/movie.controller.js';

const rutas = Router()

rutas.post('/add-movie', [ multer ], movie.addMovie)
rutas.get('/get-movies', movie.getMovies)
rutas.get('/get-movie/:id', movie.getMovie)
rutas.put('/update-movie/:id', movie.updateMovie)
rutas.delete('/delete-movie/:id', movie.removeMovie)

export default rutas