import { moduleLogger } from '@sliit-foss/module-logger';
import mongoose from 'mongoose';
import {Grid } from "gridfs-stream"

const logger = moduleLogger('Database-connection');
let gfs
const connectDB = () => {
  mongoose.connect(process.env.MONGO_URI, { keepAlive: true, connectTimeoutMS: 5000 }).catch((error) => {
    logger.error(`Error connecting to MongoDB: ${error}`);
   /* const conn = mongoose.connection;
    Grid.mongo = mongoose.mongo;
    conn.once('open', () => {
    // Initialize stream
    gfs = Grid(conn.db);
    gfs.collection('uploads');
  });*/

  });
  //const conn = mongoose.connection;

  // Initialize GridFS
  //Grid.mongo = mongoose.mongo;

  //conn.once('open', () => {
    // Initialize stream
  //  gfs = Grid(conn.db);
  //  gfs.collection('uploads');
  //});

  mongoose.connection.on('connected', () => {
    logger.info('Connected to database successfully');
  });

  mongoose.connection.on('error', (error) => {
    logger.error(`Error connecting   database: ${error}`);
  });
};


export default connectDB;
