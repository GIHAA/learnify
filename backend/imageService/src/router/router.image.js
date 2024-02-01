import express from 'express';
import image from '../controller/image.js'

const router =express.Router()

// router.get('/', async (req, res, next) => {
//     res.send({message: 'Display router it works 🐻'});
//   });
router.use('/im',image)

export default router