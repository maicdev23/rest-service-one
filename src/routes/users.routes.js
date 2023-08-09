import { Router } from "express";

import * as user from "../controllers/user.controller.js";
import * as rol from "../controllers/roles.controller.js";
import { verifyToken } from "../middlewares/verifyAuth.js";
import { authUser, indexUser } from "../controllers/auth.controller.js";

const rutas = Router()

rutas.post('/auth', authUser)
rutas.get('/main', [ verifyToken ], indexUser)

rutas.post('/add-user', user.addUser)
rutas.get('/get-users', user.getUsers)
rutas.get('/get-user/:id', user.getUser)
rutas.put('/update-user/:id', user.updateUser)
rutas.delete('/delete-user/:id', user.deleteUser)

rutas.post('/add-rol', rol.addRol)
rutas.get('/get-rols', rol.getRols)

export default rutas