import { handleImageUpload, handleImageDeletion } from '../services/image';

export const imageUpload = async (req, res) => {
  try {
    const result = await handleImageUpload(req.file.buffer);
    return res.send(result);
  } catch (error) {
    console.error('Error during image upload:', error);
    return res.status(500).send({
      message: 'Error during image upload',
    });
  }
};

export const deleteImage = async (req, res) => {
  try {
    const fileName = req.body.fileName;
    const result = await handleImageDeletion(fileName);
    return res.send(result);
  } catch (error) {
    console.error('Error during image deletion:', error);
    return res.status(500).send({
      message: 'Error during image deletion',
    });
  }
};
