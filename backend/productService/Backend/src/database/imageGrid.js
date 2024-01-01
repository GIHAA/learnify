import {Grid } from "gridfs-stream"
import mongoose from 'mongoose';

export const gdconneciopn =  ()=>{

    let gfs;


const conn = mongoose.connection;
conn.once("open", function () {
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection("uploads");
});
  return gfs
}

