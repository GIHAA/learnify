import { moduleLogger } from '@sliit-foss/module-logger';
import { Delivery } from '@/models';

const logger = moduleLogger('deliverys-repository');

export const createDeliveries = async (deliveries) => {
  try {
    const newDeliveries = (await new Delivery(deliveries).save()).toObject();
    logger.info('deliverys created:', newDeliveries);
    return newDeliveries;
  } catch (error) {
    logger.error('Error creating deliverys:', error.message);
    throw error;
  }
};

export const getAllDeliveries = async () => {
  try {
    const deliveries = await Delivery.find();
    if (!deliveries) {
      logger.warn('No deliverys found.');
      return null;
    }
    logger.info('All deliveryss retrieved:', deliveries);
    return deliveries;
  } catch (error) {
    logger.error('Error retrieving all deliveryss:', error.message);
    throw error;
  }
};

export const getOneDeliveries = async (filters) => {
  try {
    const deliveries = await Delivery.findOne({ _id: filters._id });
    if (!deliveries) {
      logger.warn('No delivery found.');
      return null;
    }
    logger.info('deliverys retrieved:', deliveries);
    return deliveries;
  } catch (error) {
    logger.error('Error retrieving deliverys:', error.message);
    throw error;
  }
};

export const findOneAndUpdateDeliveries = async (filters, data) => {
  try {
    const deliveries = await Delivery.findByIdAndUpdate(filters._id, data);
    if (!deliveries) {
      logger.warn('No deliverys found with filters:', filters);
      return null;
    }
    logger.info('deliverys updated:', deliveries);
    return deliveries;
  } catch (error) {
    logger.error('Error updating deliverys:', error.message);
    throw error;
  }
};

export const findOneAndRemoveDeliveries = async (filters) => {
  try {
    const removeddeliveries = await Delivery.findOneAndRemove(filters);
    if (!removeddeliveries) {
      logger.warn('No deliverys found with filters:', filters);
      return null;
    }
    logger.info('deliverys removed:', removeddeliveries);
    return removeddeliveries;
  } catch (error) {
    logger.error('Error removing deliverys:', error.message);
    throw error;
  }
};
