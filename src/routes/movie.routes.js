import { Router } from "express";

import multer from '../middlewares/uploadFile.js'

import  { 
    addMovie, deleteMovie, fullMovies, getMovie, getMovies, updateMovie
} from '../controllers/movie.controller.js';

import { verifyToken } from "../middlewares/verifyAuth.js";

const rutas = Router()

rutas.post('/movie', [ verifyToken ], [ multer ], addMovie)
rutas.get('/movie', [ verifyToken ], getMovies)
rutas.get('/movie/:id', getMovie)
rutas.put('/movie/:id', [ multer ], updateMovie)
rutas.delete('/movie/:id', deleteMovie)

rutas.get('/movies', fullMovies)

export default rutas