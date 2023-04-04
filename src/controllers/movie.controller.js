import fs from 'fs-extra'
import ModelMovie from '../models/movie.model.js'

export const addMovie = async (req, res) => {
    try{
        const { ...data } = req.body
        const existe = await ModelMovie.findOne({NOMBRE_DE_PELICULA: data.NOMBRE_DE_PELICULA})
        if(existe){
            return res.status(400).json({msg: `The movie ${existe.NOMBRE_DE_PELICULA} already exists`})
        }
        const movie = new ModelMovie(data)
        movie.PATH_PUBLIC = `${process.env.API}/${req.file.path}`
        movie.PATH_PRIVATE = req.file.path
        movie.MIMETYPE_FILE = req.file.mimetype
        await movie.save()
        return res.status(201).json({msg: 'Movie created successfully', movie})
    }catch(err){
        return res.status(500).json({msg: err.message});
    }
}

export const getMovies = async (req, res) => {
    const data = await ModelMovie.find()
    return res.status(200).json(data)
}

export const getMovie = async (req, res) => {
    const { id } = req.params
    const data = await ModelMovie.findById(id)
    return res.status(200).json(data)
}

export const updateMovie = async (req, res) => {
    try{
        const { id } = req.params
        const { ...data } = req.body
        await ModelMovie.findByIdAndUpdate(id, data, {new: true})
        return res.status(200).json({msg: `Movie updated successfully`})
    }catch(err){
        return res.status(500).json({msg: err.message});
    }
}

export const removeMovie = async (req, res) => {
    try{
        const { id } = req.params
        const result = await ModelMovie.findByIdAndRemove(id)
        await fs.unlink(result.PATH_PRIVATE)
        return res.status(200).json({msg: 'Movie deleted successfully'})
    }catch(err){
        console.log(err)
        return res.status(500).json({msg: err.message});
    }
}