import ModelMovie from '../models/movie.model.js'

import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../config/firebase.js";
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

initializeApp(firebaseConfig); const storage = getStorage()

export const addMovie = async (req, res) => {
    try{
        const { ...data } = req.body

        if (!req.file || !req.file.mimetype.startsWith('image/'))
            return res.status(400).json({ msg: 'POR FAVOR SELECCIONE UN FILE VALIDO.' });
        
        const storageRef = ref(storage, `archivos-nosql/${Date.now()}`)
        const metadata = { contentType: req.file.mimetype };
        const snapshot = await uploadBytes(storageRef, req.file.buffer, metadata)
        const urlx = await getDownloadURL(snapshot.ref);

        const movie = new ModelMovie({...data, USER: req.userId});
        movie.PATH_PUBLIC = urlx; await movie.save()

        return res.status(201).json({msg: 'Movie created successfully', movie})
    }catch(err){
        return res.status(500).json({msg: err.message});
    }
}

export const getMovies = async (req, res) => {
    try{
        const data = await ModelMovie.find({USER: req.userId})
        return res.status(200).json(data)
    }catch(err) {
        return res.status(500).json({msg: err.message});
    }
}

export const getMovie = async (req, res) => {
    try{
        const { id } = req.params
        const data = await ModelMovie.findById(id)
        return res.status(200).json(data)
    }catch(err){
        return res.status(500).json({msg: err.message});
    }
}

export const updateMovie = async (req, res) => {
    try{
        const { id } = req.params; const { ...data } = req.body

        const result = await ModelMovie.findById(id)
        if(!result) return res.status(404).json({msg: 'Movie not found'})

        if (!req.file || !req.file.mimetype.startsWith('image/'))
            return res.status(400).json({ msg: 'POR FAVOR SELECCIONE UN FILE VALIDO.' });

        const storageRef = ref(storage, result.PATH_PUBLIC)

        const metadata = { contentType: req.file.mimetype };
        await uploadBytes(storageRef, req.file.buffer, metadata)

        const newFileUrl = await getDownloadURL(storageRef)
        const movie = await ModelMovie.findByIdAndUpdate(id, { ...data, PATH_PUBLIC: newFileUrl })
        return res.status(200).json({msg: `Movie updated successfully`, movie})
    }catch(err){
        return res.status(500).json({msg: err.message});
    }
}

export const deleteMovie = async (req, res) => {
    try{
        const { id } = req.params
        const movie = await ModelMovie.findById(id)
        if(!movie) return res.status(404).json({msg: 'Movie not found'})

        await ModelMovie.findByIdAndDelete(id)
        const desertRef = ref(storage, movie.PATH_PUBLIC)
        await deleteObject(desertRef)

        return res.status(200).json({msg: 'Movie deleted successfully'})
    }catch(err){
        return res.status(500).json({msg: err.message});
    }
}

export const fullMovies = async (req, res) => {
    try{
        const data = await ModelMovie.find()
        return res.status(200).json(data)
    }catch(err){
        return res.status(500).json({msg: err.message});
    }
}