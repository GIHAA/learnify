import { moduleLogger } from '@sliit-foss/module-logger';
import { Enrollment } from '@/models';

const logger = moduleLogger('enrollment-repository');

export const addEnrollmentRepo = async (enrollments) => {
  try {
    const newenrollments = await new Enrollment(enrollments).save();
    logger.info('enrollment created:', newenrollments);
    return newenrollments;
  } catch (error) {
    logger.error('Error creating enrollment:', error.message);
    console.log(error);
    throw error;
  }
};

export const getAllUserEnrollmentsRepo = async (filters, query) => {
  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 10;
  const searchTerm = query.searchTerm || '';

  if (searchTerm) {
    filters.$or = [{ title: { $regex: searchTerm, $options: 'i' } }, { sl: { $regex: searchTerm, $options: 'i' } }];
  }

  try {
    const options = {
      page,
      limit
    };
    const enrollments = await Enrollment.paginate({}, options);

    return enrollments;
  } catch (error) {
    logger.error('Error retrieving enrollments:', error);
    throw error;
  }
};

export const getOneEnrollmentRepo = async (filters) => {
  try {
    const enrollment = await Enrollment.findOne(filters);
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
    $or: [{ title: { $regex: searchTerm, $options: 'i' } }, { sl: { $regex: searchTerm, $options: 'i' } }]
  };

  const options = {
    page,
    limit
  };
  try {
    const enrollments = await Enrollment.paginate(filters, options);

    logger.info('All enrollments retrieved:', enrollments);

    return enrollments;
  } catch (error) {
    logger.error('Error retrieving all enrollments:', error.message);
    console.log(error);
    throw error;
  }
};

export const removeEnrollmentRepo = async (filters) => {
  try {
    const enrollmentdelete = await Enrollment.findOneAndRemove(filters);
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
    const enrollment = await Enrollment.findByIdAndUpdate(filters, data, { new: true });
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
