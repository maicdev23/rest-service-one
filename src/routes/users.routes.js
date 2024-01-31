import { Router } from "express";

import { 
    addUser, deleteUser, getUser, getUsers, updateUser
} from '../controllers/user.controller.js'

import { addRol, getRols } from "../controllers/user-rol.controller.js";
import { verifyToken } from "../middlewares/verifyAuth.js";
import { authUser, mainUser } from "../controllers/auth.controller.js";

const rutas = Router()

rutas.post('/auth', authUser)
rutas.get('/main', [ verifyToken ], mainUser)

rutas.post('/user', addUser)
rutas.get('/user', getUsers)
rutas.get('/user/:id', getUser)
rutas.put('/user/:id', updateUser)
rutas.delete('/user/:id', deleteUser)

rutas.post('/rol', addRol)
rutas.get('/rol', getRols)

export default rutas