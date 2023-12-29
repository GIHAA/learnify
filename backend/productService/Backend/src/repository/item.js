import { moduleLogger } from '@sliit-foss/module-logger';
import { Item } from '@/models';

const logger = moduleLogger('Items-repository');

export const createItems = async (items) => {
  try {
    const newItems = (await new Item(items).save()).toObject();
    logger.info('Items created:', newItems);
    return newItems;
  } catch (error) {
    logger.error('Error creating items:', error.message);
    throw error;
  }
};


export const getAllItems = async () => {
  try {
    const items = await Item.find();
    if (!items) {
      logger.warn('No items found.');
      return null;
    }

    delete items.password;
    logger.info('All itemss retrieved:', items);
    return items;
  } catch (error) {
    logger.error('Error retrieving all itemss:', error.message);
    throw error;
  }
}

export const getOneItems = async (filters) => {
  try {
    const items = await Item.findOne({_id : filters._id}); 
    if (!items) {
      logger.warn('No item found.');
      return null;
    }
    logger.info('items retrieved:', items);
    return items;
  } catch (error) {
    logger.error('Error retrieving items:', error.message);
    throw error;
  }
}

export const findOneAndUpdateItems = async (filters, data) => {

  try {
    const items = await Item.findByIdAndUpdate(filters._id , data);
    if (!items) {
      logger.warn('No items found with filters:', filters);
      return null;
    }
    logger.info('Items updated:', items);
    return items;
  } catch (error) {
    logger.error('Error updating items:', error.message);
    throw error;
  }
};

export const findOneAndRemoveItems = async (filters) => {

  try {
    const removedItems = await Item.findOneAndRemove(filters);
    if (!removedItems) {
      logger.warn('No items found with filters:', filters);
      return null;
    }

    logger.info('Items removed:', removedItems);
    return removedItems;
  } catch (error) {
    logger.error('Error removing items:', error.message);
    throw error;
  }
};
