import ModelMovie from '../models/movie.model.js'

export const addMovie = async (req, res) => {
    try{
        const { ...data } = req.body
        const existe = await ModelMovie.findOne({NOMBRE_DE_PELICULA: data.NOMBRE_DE_PELICULA})
        if(existe){
            return res.status(400).json({msg: `The movie ${existe.NOMBRE_DE_PELICULA} already exists`})
        }
        const movie = new ModelMovie(data)
        await movie.save()
        return res.status(201).json({msg: 'Movie created successfully'})
    }catch(err){
        return res.status(500).json({msg: err.message});
    }
}

export const getMovies = async (req, res) => {
    const data = await ModelMovie.find()
    return res.status(200).json(data)
}