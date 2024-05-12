import { addCourseService , getChartDataService , getAllCoursesService, getAllMyCoursesService , getOneCourseService, updateCourseService , removeCourseService  } from '@/services/course';
import { makeResponse } from '@/utils/response';

export const addCourse = async (req, res) => {
  const course = await addCourseService(req.body);
  return makeResponse({ res, data: course, message: 'course added successfully' });
};
export const getAllMyCourses = async (req, res) => {
  const courses = await getAllMyCoursesService(req.body);
  return makeResponse({ res, data: courses, message: 'course retrieved All successfully' });
}
export const getAllCourses = async (req, res) => {
  const courses = await getAllCoursesService(req.query);
  return makeResponse({ res, data: courses, message: 'course retrieved All successfully' });
};

export const getOneCourse = async (req, res) => {
  const courses = await getOneCourseService(req.params.id);
  return makeResponse({ res, data: courses, message: 'course retrieved successfully' });
};

export const updateCourse = async (req, res) => {
  const courses = await updateCourseService(req.params.id, req.body);
  return makeResponse({ res, data: courses, message: 'course updated successfully' });
};

export const removeCourse = async (req, res) => {
  const courses = await removeCourseService(req.params.id);
  return makeResponse({ res, data: courses, message: 'course removed successfully' });
};

export const getChartData = async (req, res) => {
  const courses = await getChartDataService ();
  return makeResponse({ res, data: courses, message: 'chart data retrieved successfully' });
}