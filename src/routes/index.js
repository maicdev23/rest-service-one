import { Router } from "express";

import user from "./users.routes.js";
import movie from "./movie.routes.js";

const router = Router()

router.use('/api/v1', user, movie)
router.use('*', (req, res) => {
    return res.status(404).json({ message: 'Resource not found' });
})

export default router