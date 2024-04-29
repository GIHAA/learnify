import { moduleLogger } from '@sliit-foss/module-logger';
import { enrollment } from '@/models';

const logger = moduleLogger('enrollment-repository');

export const addEnrollmentRepo = async (enrollments) => {
 
  try {
    const newenrollments = (await new enrollment(enrollments).save());
    logger.info('enrollment created:', newenrollments);
    return newenrollments;
  } catch (error) {
    logger.error('Error creating enrollment:', error.message);
    console.log(error)
    throw error;
  }
  
};

export const getOneEnrollmentRepo = async (filters) => {
  try {
    const enrollment = await enrollment.findOne({ enrollmentId: filters.enrollmentId });
    if (!enrollment) {
      logger.warn('No enrollment found.');
      return null;
    }

    logger.info('enrollment retrieved:', enrollment);
    return enrollment;
  } catch (error) {
    logger.error('Error retrieving enrollment:', error.message);
    throw error;
  }
};

export const getAllEnrollmentsRepo = async (query) => {
  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 10;
  const searchTerm = query.searchTerm || '';

  const filters = {
    $or: [
      { title: { $regex: searchTerm, $options: 'i' } },
      { sl: { $regex: searchTerm, $options: 'i' } },
    ],
  };

  const options = {
    page,
    limit,
  };
  try {
    const enrollments = await enrollment.paginate(filters, options);

    logger.info('All enrollments retrieved:', enrollments);

    return enrollments;
  } catch (error) {
    logger.error('Error retrieving all enrollments:', error.message);
    console.log(error)
    throw error;
  }
};

export const removeEnrollmentRepo = async (filters) => {
  try {
    const enrollmentdelete = await enrollment.findOneAndRemove(filters);
    if (!enrollmentdelete) {
      logger.warn('No enrollment found with filters:', filters);
      return null;
    }
    logger.info('enrollment removed:', enrollmentdelete);
    return enrollmentdelete;
  } catch (error) {
    logger.error('error toremovw enrollment', error.message);
    throw error;
  }
};

export const updateEnrollmentRepo = async (filters, data) => {
  try {
    const enrollment = await enrollment.findByIdAndUpdate(filters._id, data);
    if (!enrollment) {
      logger.warn('No enrollment found with filters:', filters);
      return null;
    }
    logger.info('enrollment updated:', enrollment);
    return enrollment;
  } catch (e) {
    logger.error('error update enrollment', e.message);
    throw e;
  }
};