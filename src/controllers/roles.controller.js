import ModelRol from '../models/roles.model.js'

export const addRol = async (req, res) => {
    try{
        const { ...data } = req.body
        const existe = await ModelRol.findOne({rol: data.rol})
        if(existe){
            return res.status(400).json({msg: `The rol ${existe.rol} already exists`})
        }
        const rol = new ModelRol(data); await rol.save()
        return res.status(201).json({msg: 'Rol created successfully'})
    }catch(err){
        return res.status(500).json({msg: err.message});
    }
}

export const getRols = async (req, res) => {
    const data = await ModelRol.find()
    return res.status(200).json(data)
}