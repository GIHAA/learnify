import multer from 'multer'
import express from 'express'
import {imageUpload, deleteImage } from '../repositery/image.js'

const image = express.Router()


const upload = multer({storage :multer.memoryStorage()})

image.post('/',upload.single('images'),imageUpload)

image.delete('/', async (req, res, next) => {
    try {
      await deleteImage(req, res);
    } catch (error) {
      console.error('Error handling request:', error);
      return res.status(500).json({
        message: 'Internal Server Error',
        error: error.message
      });
    }
  });
  
export default image
