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
        return res.status(201).json({msg: 'User created successfully', user})
    }catch(err){
        return res.status(500).json({msg: err.message});
    }
}

export const getUsers = async (req, res) => {
    try{
        const data = await ModelUser.find()
        return res.status(200).json(data)
    }catch(err){
        return res.status(500).json({msg: err.message});
    }
}

export const getUser = async (req, res) => {
    try{
        const { id } = req.params
        const data = await ModelUser.findById(id)
        return res.status(200).json(data)
    }catch(err){
        return res.status(500).json({msg: err.message});
    }
}

export const updateUser = async (req, res) => {
    try{
        const { id } = req.params
        const { ...data } = req.body
        await ModelUser.findByIdAndUpdate(id, data, {new: true})
        return res.status(200).json({msg: `User updated successfully`})
    }catch(err){
        return res.status(500).json({msg: err.message});
    }
}

export const removeUser = async (req, res) => {
    try{
        const { id } = req.params
        await ModelUser.findByIdAndRemove(id)
        return res.status(200).json({msg: 'User deleted successfully'})
    }catch(err){
        console.log(err)
        return res.status(500).json({msg: err.message});
    }
}