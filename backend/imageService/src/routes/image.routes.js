import express from 'express';
import { tracedAsyncHandler } from '@sliit-foss/functions';
import { celebrate } from 'celebrate';
import multer from 'multer'
import { imageUpload , deleteImage } from '@/controllers/image';

const upload = multer({storage :multer.memoryStorage()})

const product = express.Router();

product.post('/',upload.single('images')  ,  tracedAsyncHandler(imageUpload));
product.delete('/', tracedAsyncHandler(deleteImage));

export default product;
