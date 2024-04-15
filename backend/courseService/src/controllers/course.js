import { addCourseService  , getAllCoursesService, getOneCourseService, updateCourseService , removeCourseService  } from '@/services/course';
import { makeResponse } from '@/utils/response';

export const addCourse = async (req, res) => {
  const ProducateData = req.body;
  const order = await addCourseService(ProducateData);
  return makeResponse({ res, data: order, message: 'course added successfully' });
 
};
export const getAllCourses = async (req, res) => {
  const orders = await getAllCoursesService(req.query);
  return makeResponse({ res, data: orders, message: 'course retrieved All successfully' });
};

export const getOneCourse = async (req, res) => {
  const orders = await getOneCourseService(req.params.id);
  return makeResponse({ res, data: orders, message: 'course retrieved successfully' });
};

export const updateCourse = async (req, res) => {
  const orders = await updateCourseService(req.params.id, req.body);
  return makeResponse({ res, data: orders, message: 'course updated successfully' });
};

export const removeCourse = async (req, res) => {
  const orders = await removeCourseService(req.params.id);
  return makeResponse({ res, data: orders, message: 'course removed successfully' });
};