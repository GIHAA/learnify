import { moduleLogger } from '@sliit-foss/module-logger';
import mongoose from 'mongoose';
import { Feedback } from '@/models';
import { RABBIMQ_CONFIG } from '@/utils';
import { sendMessageToQueue } from '@/utils/messageBroker';

const logger = moduleLogger('feedback-repository');

export const createfeedbacke = async (feedback) => {
  try {
    const newfeedbackes = await new Feedback(feedback).save();
    
    logger.info('feedback created:', newfeedbackes);
    sendMessageToQueue(RABBIMQ_CONFIG.FEEDBACK_VALIDATION_QUEUE, newfeedbackes);

    return newfeedbackes;
  } catch (error) {
    logger.error('Error creating feedback:', error.message);
    console.log(error);
    throw error;
  }
};

export const getOnefeedbacke = async (filters) => {
  try {
    const feedbackef = await Feedback.findOne({ feedbackeId: filters.feedbackeId });
    if (!feedbackef) {
      logger.warn('No feedback found.');
      return null;
    }

    logger.info('feedback retrieved:', feedbackef);
    return feedbackef;
  } catch (error) {
    logger.error('Error retrieving feedback:', error.message);
    throw error;
  }
};

export const getAllfeedbacke = async () => {
  try {
    const feedbackes = await Feedback.find();
    if (!feedbackes) {
      logger.warn('No feedback found.');
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
    const feedbackedelete = await Feedback.findOneAndRemove(filters);
    if (!feedbackedelete) {
      logger.warn('No feedback found with filters:', filters);
      return null;
    }
    logger.info('feedback removed:', feedbackedelete);
    return feedbackedelete;
  } catch (error) {
    logger.error('error toremovw feedback', error.message);
    throw error;
  }
};

export const updatefeedbacke = async (filters, data) => {
  try {
    const feedback = await Feedback.findByIdAndUpdate(filters._id, data);
    if (!feedback) {
      logger.warn('No feedback found with filters:', filters);
      return null;
    }
    logger.info('feedback updated:', feedback);
    return feedback;
  } catch (e) {
    logger.error('error update feedback', e.message);
    throw e;
  }
};
