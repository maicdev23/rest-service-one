import { Router } from "express";

import multer from '../middlewares/uploadFile.js'

import { addMovie, getMovie, getMovies, removeMovie, updateMovie } from '../controllers/movie.controller.js';

const rutas = Router()

rutas.post('/add-movie', multer, addMovie)
rutas.get('/get-movies', getMovies)
rutas.get('/get-movie/:id', getMovie)
rutas.put('/update-movie/:id', updateMovie)
rutas.delete('/delete-movie/:id', removeMovie)

export default rutas