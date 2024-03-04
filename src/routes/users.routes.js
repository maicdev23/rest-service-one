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

rutas.route('/user')
    .post(addUser)
    .get(getUsers)

rutas.route('/user/:id')
    .get(getUser)
    .put(updateUser)
    .delete(deleteUser)

rutas.route('/rol')
    .post(addRol)
    .get(getRols)

export default rutas