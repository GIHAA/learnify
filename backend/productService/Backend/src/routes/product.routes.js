import express from 'express';
import { tracedAsyncHandler } from '@sliit-foss/functions';
import { celebrate } from 'celebrate';
import { addorder, getAll, getById, remove, update ,imagerectrive} from '@/controllers/order';
import { orderRequestAdd } from '@/validations/order';
import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';
import mongoose from 'mongoose';

const order = express.Router();
/*
// Create a connection to MongoDB
const conn = mongoose.connection;

// Initialize GridFS
let gfs;

conn.once('open', () => {
  gfs = new mongoose.mongo.GridFSBucket(conn.db, { bucketName: 'uploads' });
});
*/
// Create storage using GridFsStorage
const storage = new GridFsStorage({
  url: process.env.MONGO_URI,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    return {
      bucketName: 'uploads',
      filename: file.fieldname + '_' + Date.now() + '-' + Math.round(Math.random() * 1E9) + '.png',
    };
  },
});

// Initialize multer with the storage engine
const upload = multer({ storage });
/*
// Define route to get image
order.get('/image/:filename', (req, res) => {
  const { filename } = req.params;
  const readstream = gfs.openDownloadStreamByName(filename);

  readstream.on('error', () => {
    res.status(404).json({ error: 'Image not found' });
  });

  readstream.pipe(res);
});*/
order.get('/image/:filename',imagerectrive)
// Define other order routes
/*
order.delete('/imaged/:filename',(req,res)=>{

    const {filename} = req.params;
    try{

       gfs.delete({filename})
       res.json({message :'massage delete complted'})
    }catch{

      res.status(500).json({ error: 'Error deleting file' });
    }
})*/
order.post('/d', upload.single('image'), tracedAsyncHandler(addorder));
order.get('/', tracedAsyncHandler(getAll));
order.get('/:id', tracedAsyncHandler(getById));
order.patch('/:id' ,tracedAsyncHandler(update));
order.delete('/:id', tracedAsyncHandler(remove));

export default order;

