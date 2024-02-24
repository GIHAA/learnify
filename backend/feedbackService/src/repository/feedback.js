import { moduleLogger } from '@sliit-foss/module-logger';
import mongoose from 'mongoose';
import { feedback } from '@/models';
import { RABBIMQ_CONFIG } from '@/utils';
import { sendMessageToQueue } from '@/utils/messageBroker';

const logger = moduleLogger('feedbacke-repository');

export const createfeedbacke = async (feedback) => {
  try {
    const newfeedbackes = await new feedback(feedback).save();
    
    logger.info('feedbacke created:', newfeedbackes);
    sendMessageToQueue(RABBIMQ_CONFIG.FEEDBACK_VALIDATION_QUEUE, newfeedbackes);

    return newfeedbackes;
  } catch (error) {
    logger.error('Error creating feedbacke:', error.message);
    console.log(error);
    throw error;
  }
};

export const getOnefeedbacke = async (filters) => {
  try {
    const feedbackef = await feedback.findOne({ feedbackeId: filters.feedbackeId });
    if (!feedbackef) {
      logger.warn('No feedbacke found.');
      return null;
    }

    logger.info('feedbacke retrieved:', feedbackef);
    return feedbackef;
  } catch (error) {
    logger.error('Error retrieving feedbacke:', error.message);
    throw error;
  }
};

export const getAllfeedbacke = async () => {
  try {
    const feedbackes = await feedback.find();
    if (!feedbackes) {
      logger.warn('No feedbacke found.');
      return null;
    }

    logger.info('All feedbackes retrieved:', feedbackes);

    return feedbackes;
  } catch (error) {
    logger.error('Error retrieving all feedbackes:', error.message);
    console.log(error);
    throw error;
  }
};

export const removefeedbacke = async (filters) => {
  try {
    const feedbackedelete = await feedback.findOneAndRemove(filters);
    if (!feedbackedelete) {
      logger.warn('No feedbacke found with filters:', filters);
      return null;
    }
    logger.info('feedbacke removed:', feedbackedelete);
    return feedbackedelete;
  } catch (error) {
    logger.error('error toremovw feedbacke', error.message);
    throw error;
  }
};

export const updatefeedbacke = async (filters, data) => {
  try {
    const feedbacke = await feedback.findByIdAndUpdate(filters._id, data);
    if (!feedbacke) {
      logger.warn('No feedbacke found with filters:', filters);
      return null;
    }
    logger.info('feedbacke updated:', feedbacke);
    return feedbacke;
  } catch (e) {
    logger.error('error update feedbacke', e.message);
    throw e;
  }
};
