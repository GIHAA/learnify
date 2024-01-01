import { moduleLogger } from '@sliit-foss/module-logger';
import { producte } from '@/models';
import mongoose from 'mongoose';
const logger = moduleLogger('producte-repository');

export const createproducte = async (productes) => {
 
  try {
    const newproductes = (await new producte(productes).save());
    logger.info('producte created:', newproductes);
    return newproductes;
  } catch (error) {
    logger.error('Error creating producte:', error.message);
    console.log(error)
    throw error;
  }
  
};

export const getOneproducte = async (filters) => {
  try {
    const productef = await producte.findOne({ producteId: filters.producteId });
    if (!productef) {
      logger.warn('No producte found.');
      return null;
    }

    logger.info('producte retrieved:', productef);
    return productef;
  } catch (error) {
    logger.error('Error retrieving producte:', error.message);
    throw error;
  }
};

export const getAllproducte = async () => {
  try {
    const productes = await producte.find();
    if (!productes) {
      logger.warn('No producte found.');
      return null;
    }

    logger.info('All productes retrieved:', productes);

    return productes;
  } catch (error) {
    logger.error('Error retrieving all productes:', error.message);
    console.log(error)
    throw error;
  }
};

export const removeproducte = async (filters) => {
  try {
    const productedelete = await producte.findOneAndRemove(filters);
    if (!productedelete) {
      logger.warn('No producte found with filters:', filters);
      return null;
    }
    logger.info('producte removed:', productedelete);
    return productedelete;
  } catch (error) {
    logger.error('error toremovw producte', error.message);
    throw error;
  }
};

export const updateproducte = async (filters, data) => {
  try {
    const producte = await producte.findByIdAndUpdate(filters._id, data);
    if (!producte) {
      logger.warn('No producte found with filters:', filters);
      return null;
    }
    logger.info('producte updated:', producte);
    return producte;
  } catch (e) {
    logger.error('error update producte', e.message);
    throw e;
  }
};

const conn = mongoose.connection;

// Initialize GridFS
let gfs;

conn.once('open', () => {
  gfs = new mongoose.mongo.GridFSBucket(conn.db, { bucketName: 'uploads' });
});

export const imagefindbyid = (image,res)=>{

  const readstream = gfs.openDownloadStreamByName(image);

  readstream.on('error', () => {
    res.status(404).json({ error: 'Image not found' });
  });

  readstream.pipe(res);
}
