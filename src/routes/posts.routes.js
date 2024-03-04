import { Router } from "express";

import multer from '../middlewares/uploadFile.js'

import  { 
    addPost, deletePost, fullPosts, getPost, getPosts, updatePost
} from '../controllers/post.controller.js';

import { verifyToken } from "../middlewares/verifyAuth.js";

const rutas = Router()

rutas.route('/post',)
    .post([ verifyToken ], [ multer ], addPost)
    .get([ verifyToken ], getPosts)

rutas.route('/post/:id',)
    .get(getPost)
    .put([ multer ], updatePost)
    .delete(deletePost)

rutas.get('/posts', fullPosts)

export default rutas