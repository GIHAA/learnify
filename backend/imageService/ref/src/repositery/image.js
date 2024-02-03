import { deleteObject, getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { initializeFirebaseApp } from '../controller/initializeFirebaseApp.js';

initializeFirebaseApp();

const storage = getStorage();

export const imageUpload = async (req, res) => {
  try {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const fileNameWithSuffix = 'up-' + uniqueSuffix + '.png';

    const storageRef = ref(storage, `images/${fileNameWithSuffix}`);
    const uploadTask = uploadBytesResumable(storageRef, req.file.buffer);

    uploadTask.on('state_changed', (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log(`Upload is ${progress}% done`);

      if (snapshot.state === 'paused') {
        console.log('Upload is paused');
      } else if (snapshot.state === 'running') {
        console.log('Upload is running');
      }
    }, (error) => {
      handleUploadError(error);
    }, async () => {
      const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
      console.log('File available at', downloadURL);
      return res.send({
        message: 'Upload successful',
        name: uploadTask.snapshot.ref.name,
        downloadURL
      });
    });
  } catch (error) {
    console.error('Error during image upload:', error);
    return res.status(500).send({
      message: 'Error during image upload'
    });
  }
};

export const deleteImage = (req, res) => {
  try {
    const fileName = req.body.fileName; 
    const filePath = `images/${fileName}`;
    
    const desertRef = ref(storage, filePath);
    
    deleteObject(desertRef)
      .then(() => {
        console.log('Delete Successful in CMD');
        return res.send({
          message: 'Delete Successful'
        });
      })
      .catch((error) => {
        handleDeleteError(error, res);
      });
  } catch (error) {
    console.error('Error during image deletion:', error);
    return res.status(500).send({
      message: 'Error during image deletion'
    });
  }
};


const handleUploadError = (error) => {
  switch (error.code) {
    case 'storage/unauthorized':
      console.log('User does not have permission to access the object');
      break;
    case 'storage/canceled':
      console.log('User canceled the upload');
      break;
    case 'storage/unknown':
      console.log('Unknown error occurred, inspect error.serverResponse');
      break;
    default:
      console.error('Unhandled upload error:', error);
  }
};

const handleDeleteError = (error, res) => {
  console.error('Error deleting file:', error);
  return res.status(500).send({
    message: 'Error deleting file'
  });
};