import jwt from "jsonwebtoken";

import ModelUser from "../models/user.model.js";

export const authUser = async (req, res) => {
    const { username, password } = req.body
    const existe = await ModelUser.findOne({ username: username })
    if(!existe){
        return res.status(404).json({ msg: 'Usuario no encontrado' })
    }else{
        const token = jwt.sign({id: existe._id}, process.env.JWT, { expiresIn: 60*60*24 })
        return res.status(200).json({ msg: 'Welcome', auth: true, accessToken: token })
    }  
}

export const indexUser = async (req, res) => {
    const user = await ModelUser.findById(req.userId, {password: 0})
    return res.status(200).json(user)
}