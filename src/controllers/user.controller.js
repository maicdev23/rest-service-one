import ModelUser from '../models/user.model.js'

export const addUser = async (req, res) => {
    try{
        const { ...data } = req.body
        const existe = await ModelUser.findOne({fullname: data.fullname})
        if(existe){
            return res.status(400).json({msg: `The user ${existe.fullname} already exists`})
        }
        const user = new ModelUser(data)
        await user.save()
        return res.status(201).json({msg: 'User created successfully'})
    }catch(err){
        return res.status(500).json({msg: err.message});
    }
}

export const getUsers = async (req, res) => {
    const data = await ModelUser.find()
    return res.status(200).json(data)
}