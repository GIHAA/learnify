 //import config from '../config/db.js'
//import  { initializeApp } from 'firebase/app'
//import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import multer from 'multer'
import express from 'express'
import {imageUploade} from '../repositery/image.js'

 //import {initializeFirebaseApp} from '../controller/initializeFirebaseApp.js'
const image = express.Router()
// const initializeFirebaseApp = async () => {
//   try {
//     await initializeApp(config.firebaseConfig);
//     console.log('Firebase initialized successfully');
//   } catch (error) {
//     console.error('Firebase initialization error:', error.stack);
//     process.exit(1); // Exit the process if Firebase initialization fails
//   }
// };
// import {initializeFirebaseApp} from '../controller/initializeFirebaseApp.js'
// initializeFirebaseApp(); 
// // initializeFirebaseApp(); 
//  const storage = getStorage();

const upload = multer({storage :multer.memoryStorage()})

// image.post('/',upload.single('images'),async(req,res)=>{
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     const fileNameWithSuffix ='up-' + uniqueSuffix+'.png';
    
    
//     const storageRef = ref(storage, 'images/' + fileNameWithSuffix);

//     const uploadTask = uploadBytesResumable(storageRef, req.file.buffer);

//     uploadTask.on('state_changed',
//   (snapshot) => {
//     // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
//     const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//     console.log('Upload is ' + progress + '% done');
//     switch (snapshot.state) {
//       case 'paused':
//         console.log('Upload is paused');
//         break;
//       case 'running':
//         console.log('Upload is running');
//         break;
//     }
//   }, 
//   (error) => {
//     // A full list of error codes is available at
//     // https://firebase.google.com/docs/storage/web/handle-errors
//     switch (error.code) {
//       case 'storage/unauthorized':
//         // User doesn't have permission to access the object
//         break;
//       case 'storage/canceled':
//         // User canceled the upload
//         break;

//       // ...

//       case 'storage/unknown':
//         // Unknown error occurred, inspect error.serverResponse
//         break;
//     }
//   }, 
//   () => {
//     // Upload completed successfully, now we can get the download URL
//     getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//       console.log('File available at', downloadURL);
//       return res.send(
//          {
//           massage : 'uplode succesfull',
//           DownloadURL : downloadURL
//          }
//       )
//     });
//   }
// );

     
// })
image.post('/',upload.single('images'),imageUploade)

export default image
