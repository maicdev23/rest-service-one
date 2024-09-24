import ModelPost from '../models/post.model.js'

import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../config/firebase.js";
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

initializeApp(firebaseConfig); const storage = getStorage()

export const getPosts = async (req, res) => {
    try {
        const data = await ModelPost.find({ user_id: req.userId })
        return res.status(200).json(data)
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
}

export const addPost = async (req, res) => {
    try {
        const { ...data } = req.body

        if (!req.file) //|| !req.file.mimetype.startsWith('image/')
            return res.status(400).json({ msg: 'POR FAVOR SELECCIONE UN FILE VALIDO.' });

        const storageRef = ref(storage, `rest-service/${Date.now()}`)
        const metadata = { contentType: req.file.mimetype };
        const snapshot = await uploadBytes(storageRef, req.file.buffer, metadata)
        const urlx = await getDownloadURL(snapshot.ref);

        const post = new ModelPost({ ...data, user_id: req.userId });
        post.path_public = urlx; await post.save()

        return res.status(201).json({ msg: 'Post added successfully', post })
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
}

export const getPost = async (req, res) => {
    try {
        const { id } = req.params
        const post = await ModelPost.findById(id)

        if (!post) return res.status(404).json({ msg: 'Post not found' })

        return res.status(200).json(post)
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
}

export const updatePost = async (req, res) => {
    try {
        const { id } = req.params; const { ...data } = req.body

        await getPost()

        if (!req.file) {
            await ModelPost.findByIdAndUpdate(id, data, { new: true })
            return res.status(200).json({ msg: `Post updated successfully` })
        }
        else {
            const storageRef = ref(storage, result.path_public)

            const metadata = { contentType: req.file.mimetype };
            await uploadBytes(storageRef, req.file.buffer, metadata)

            const newFileUrl = await getDownloadURL(storageRef)
            await ModelPost.findByIdAndUpdate(id, { ...data, path_public: newFileUrl })
            return res.status(200).json({ msg: `Post updated successfully` })
        }
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
}

export const deletePost = async (req, res) => {
    try {
        const { id } = req.params
        const post = await ModelPost.findById(id)
        if (!post) return res.status(404).json({ msg: 'Post not found' })

        await ModelPost.findByIdAndDelete(id)
        const desertRef = ref(storage, post.path_public)
        await deleteObject(desertRef)

        return res.status(200).json({ msg: 'Post deleted successfully' })
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
}

export const posts = async (req, res) => {
    try {
        const data = await ModelPost.find()
        return res.status(200).json(data)
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
}