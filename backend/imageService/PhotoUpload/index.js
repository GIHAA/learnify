// const express = require('express')
// const createError = require("http-errors");
// const cors = require('cors')
// const router = require('./src/router/router')
import express from 'express';
import cors from 'cors'
import createError from 'http-errors'
import router from "./src/router/router.image.js"

const app = express()

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));

app.use(cors())



app.use('/appimage',router)
app.use((req, res, next) => {
    next(createError.NotFound());
  });
  
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
      status: err.status || 500,
      message: err.message,
    });
  });
  
  const PORT = process.env.PORT || 8000;
  app.listen(PORT, () => {
    console.log(`🚀 @ http://localhost:${PORT}`)
    
  });
  try{

  }catch(errors){

  }