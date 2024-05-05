import { moduleLogger } from '@sliit-foss/module-logger';
import { course } from '@/models';

const logger = moduleLogger('course-repository');

export const addCourseRepo = async (courses) => {
 
  try {
    const newcourses = (await new course(courses).save());
    logger.info('course created:', newcourses);
    return newcourses;
  } catch (error) {
    logger.error('Error creating course:', error.message);
    console.log(error)
    throw error;
  }
  
};

export const getOneCourseRepo = async (filters) => {
  try {
    const course = await course.findOne({ courseId: filters.courseId });
    if (!course) {
      logger.warn('No course found.');
      return null;
    }

    logger.info('course retrieved:', course);
    return course;
  } catch (error) {
    logger.error('Error retrieving course:', error.message);
    throw error;
  }
};

export const getAllCoursesRepo = async (query) => {
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
    limit
  };
  try {
    const courses = await course.paginate(filters, options);

    logger.info('All courses retrieved:', courses);

    return courses;
  } catch (error) {
    logger.error('Error retrieving all courses:', error.message);
    console.log(error)
    throw error;
  }
};

export const removeCourseRepo = async (filters) => {
  try {
    const coursedelete = await course.findOneAndRemove(filters);
    if (!coursedelete) {
      logger.warn('No course found with filters:', filters);
      return null;
    }
    logger.info('course removed:', coursedelete);
    return coursedelete;
  } catch (error) {
    logger.error('error toremovw course', error.message);
    throw error;
  }
};

export const updateCourseRepo = async (filters, data) => {
  try {
    const course = await course.findByIdAndUpdate(filters._id, data);
    if (!course) {
      logger.warn('No course found with filters:', filters);
      return null;
    }
    logger.info('course updated:', course);
    return course;
  } catch (e) {
    logger.error('error update course', e.message);
    throw e;
  }
};