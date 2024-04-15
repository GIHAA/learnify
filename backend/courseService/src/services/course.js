import { default as createError } from 'http-errors';
import { addCourseRepo, getAllCoursesRepo,  getOneCourseRepo, removeCourseRepo, updateCourseRepo, } from '@/repository/course';


export const addCourseService = async (payload) => {
  const newCourse = await addCourseRepo({
    ...payload
  });
  return newCourse;
};

export const getAllCoursesService = (query) => {
  const courses = getAllCoursesRepo(query);
  if (courses.length === 0) throw new createError(404, 'No Courses Found');

  return courses;
};

export const getOneCourseService = async (id) => {
  const Courses = await getOneCourseRepo({ _id: id });

  if (!Courses) throw new createError(401, 'Invalid Course ID');

  return Courses;
};

export const updateCourseService = async (itemid, payload) => {
  const updatedItems = await updateCourseRepo({ _id: itemid }, payload);
  return updatedItems;
};

export const removeCourseService = async (id) => {
  const Courses = await removeCourseRepo({ _id: id });
  if (!Courses) throw new createError(401, 'Invalid Course ID');
  return Courses;
};