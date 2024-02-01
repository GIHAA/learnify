import { getStorage, ref, uploadBytesResumable, getDownloadURL,deleteObject } from "firebase/storage"
//  import {initializeFirebaseApp} from '../controller/initializeFirebaseApp.js'


//const storage = getStorage();

// initializeFirebaseApp(); 
import {initializeFirebaseApp} from '../controller/initializeFirebaseApp.js'
initializeFirebaseApp(); 
// initializeFirebaseApp(); 
 const storage = getStorage();
export const imageUploade =  async(req,res)=>{

    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const fileNameWithSuffix ='up-' + uniqueSuffix+'.png';
    
    
    const storageRef = ref(storage, 'images/' + fileNameWithSuffix);

    const uploadTask = uploadBytesResumable(storageRef, req.file.buffer);

    uploadTask.on('state_changed',
  (snapshot) => {
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
    }
  }, 
  (error) => {
    // A full list of error codes is available at
    // https://firebase.google.com/docs/storage/web/handle-errors
    switch (error.code) {
      case 'storage/unauthorized':
        // User doesn't have permission to access the object
        break;
      case 'storage/canceled':
        // User canceled the upload
        break;

      // ...

      case 'storage/unknown':
        // Unknown error occurred, inspect error.serverResponse
        break;
    }
  }, 
  () => {
    // Upload completed successfully, now we can get the download URL
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      console.log('File available at', downloadURL);
      // const fileName = uploadTask.snapshot.ref.name;
     // encodeURIComponent(downloadURL)
      return res.send(
         {
          massage : 'uplode succesfull',
          name : uploadTask.snapshot.ref.name,
          DownloadURL : downloadURL,
         endcodeurle :   encodeURIComponent(downloadURL)
         }
      )
     
    });
  }
);
}

export const DeleteImage = (req,res)=>{
//This code work
  // const filePath = decodeURIComponent(req.params.url.split('images%2F')[1].split('?')[0]);
  // console.log(filePath)
  // `images/${filePath}`
  // const desertRef = ref(storage,`images/${req.params.id}`);
  // deleteObject(desertRef).then(() => {
  //   console.log("Delete SucessFull in CMD");
  //   return res.send(
  //     {
  //         massage : "Delete Suceesull"
  //     }
      
  //   )
  // }).catch((error) => {
  //  console.log(error);
  // });
//above code work properly

//   const url = req.params.url;

//   // Decode the URL
//   const decodedUrl = decodeURIComponent(url);

//   // Extract the file path from the decoded URL
//   const filePath = decodedUrl.split('images%2F')[1].split('?')[0];

// // Log the filePath for debugging
// console.log('Deleting file at path:', filePath);

// // Construct the reference to the image in Firebase Storage
// const desertRef = ref(storage, filePath);

// // Delete the object using the deleteObject function
// deleteObject(desertRef)
//   .then(() => {
//     console.log("Delete Successful in CMD");
//     return res.send({
//       message: "Delete Successful"
//     });
//   })
//   .catch((error) => {
//     console.error("Error deleting file:", error);

//     // Log the error details for debugging
//     console.error(error);

//     return res.status(500).send({
//       message: "Error deleting file"
//     });
//   });


// 
// try {
//   // Access the id parameter from the path
//   const id = req.params.url;

//   if (!id) {
//     throw new Error('Invalid or missing id parameter.');
//   }

//   // Decode the URL
//   const decodedUrl = decodeURIComponent(id);

//   // Log the decodedUrl for debugging
//   console.log('Decoded URL:', decodedUrl);

//   // Check if the URL contains 'images%2F' and '?'
//   if (!decodedUrl.includes('images%2F') || !decodedUrl.includes('?')) {
//     throw new Error('Invalid URL format.');
//   }

//   // Extract the file path from the decoded URL
//   const filePath = decodedUrl.split('images%2F')[1].split('?')[0];

//   // Log the filePath for debugging
//   console.log('Deleting file at path:', filePath);

//   // Construct the reference to the image in Firebase Storage
//   const desertRef = ref(storage, filePath);

//   // Delete the object using the deleteObject function
//    deleteObject(desertRef);

//   console.log("Delete Successful in CMD");
//   return res.send({
//     message: "Delete Successful"
//   });
// } catch (error) {
//   console.error("Error deleting file:", error);

//   // Log the error details for debugging
//   console.error(error);

//   return res.status(500).send({
//     message: "Error deleting file",
//     error: error.message
//   });
// }

  const filePath = decodeURIComponent(req.params.url.split('images%2F')[1].split('?')[0]);

  // Construct the reference to the image in Firebase Storage
  const desertRef = ref(storage, `images/${filePath}`);

  // Delete the object using the deleteObject function
  deleteObject(desertRef)
    .then(() => {
      console.log("Delete Successful in CMD");
      return res.send({
        message: "Delete Successful"
      });
    })
    .catch((error) => {
      console.error("Error deleting file:", error);
      return res.status(500).send({
        message: "Error deleting file"
      });
    });
//   const filePath = decodeURIComponent(req.params.id.split('images%2F')[1].split('?')[0]);

// // Log the filePath for debugging
// console.log('Deleting file at path:', filePath);

// // Construct the reference to the image in Firebase Storage
// const desertRef = ref(storage, filePath);

// // Delete the object using the deleteObject function
// deleteObject(desertRef)
//   .then(() => {
//     console.log("Delete Successful in CMD");
//     return res.send({
//       message: "Delete Successful"
//     });
//   })
//   .catch((error) => {
//     console.error("Error deleting file:", error);

//     // Log the error details for debugging
//     console.error(error);

//     return res.status(500).send({
//       message: "Error deleting file"
//     });
//   });

}