import { Router } from "express";

import multer from '../middlewares/uploadFile.js'
import { verifyToken } from "../middlewares/verifyAuth.js";

import { addMovie, getMovie, getMovies, removeMovie, updateMovie } from '../controllers/movie.controller.js';
import { addUser, getUsers } from "../controllers/user.controller.js";
import { authUser, indexUser } from "../controllers/auth.controller.js";

const rutas = Router()

rutas.post('/auth', authUser)
rutas.get('/index', [ verifyToken ], indexUser)

rutas.post('/add-user', addUser)
rutas.get('/get-users', getUsers)

rutas.post('/add-movie', [ multer ], addMovie)
rutas.get('/get-movies', getMovies)
rutas.get('/get-movie/:id', getMovie)
rutas.put('/update-movie/:id', updateMovie)
rutas.delete('/delete-movie/:id', removeMovie)

export default rutas