import express from 'express';
import image from '../controller/image.js'

const router =express.Router()

router.use('/im',image)


export default router