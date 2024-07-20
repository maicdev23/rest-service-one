import jwt from "jsonwebtoken";

import ModelUser from "../models/user.model.js";
import { decrypt } from "../helpers/bcrypt.js";

export const authUser = async (req, res) => {
    try {
        const { username, password } = req.body
        const existe = await ModelUser.findOne({ username: username })
        if (!existe) return res.status(404).json({ msg: 'Usuario no encontrado' })

        const match = await decrypt(password, existe.password)
        if (!match) return res.status(404).json({ msg: 'Contraseña incorrecta' })

        const token = jwt.sign({ id: existe._id }, process.env.JWT, { expiresIn: '1h' })
        
        return res.status(200).json({
            msg: 'Welcome', auth: true, accessToken: token, role: existe.rol_id
        })
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}

export const mainUser = async (req, res) => {
    try {
        const user = await ModelUser.findById(req.userId, { password: 0 })
        return res.status(200).json(user)
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}