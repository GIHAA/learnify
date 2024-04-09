import { uploadImageToStorage, deleteImageFromStorage } from '../repository/image';

export const handleImageUpload = async (buffer) => {
  try {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const fileNameWithSuffix = 'up-' + uniqueSuffix + '.png';

    const downloadURL = await uploadImageToStorage(buffer, fileNameWithSuffix);

    return {
      message: 'Upload successful',
      name: fileNameWithSuffix,
      downloadURL,
    };
  } catch (error) {
    throw new Error('Error during image upload');
  }
};

export const handleImageDeletion = async (fileName) => {
  try {
    await deleteImageFromStorage(fileName);

    return {
      message: 'Delete Successful',
    };
  } catch (error) {
    throw new Error('Error during image deletion');
  }
};
