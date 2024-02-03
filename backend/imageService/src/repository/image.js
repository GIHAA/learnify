import { deleteObject, getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';

export const uploadImageToStorage = async (buffer, fileNameWithSuffix) => {
  const storage = getStorage();
  const storageRef = ref(storage, `images/${fileNameWithSuffix}`);
  const uploadTask = uploadBytesResumable(storageRef, buffer);

  return new Promise((resolve, reject) => {
    uploadTask.on('state_changed', (snapshot) => {
    }, (error) => {
      reject(error);
    }, async () => {
      const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
      resolve(downloadURL);
    });
  });
};

export const deleteImageFromStorage = async (fileName) => {
  const storage = getStorage();
  const filePath = `images/${fileName}`;
  const desertRef = ref(storage, filePath);

  return deleteObject(desertRef);
};
