import express from 'express';
import { tracedAsyncHandler } from '@sliit-foss/functions';
import { addCourse, getAllCourses , getAllMyCourses ,  getOneCourse, removeCourse, updateCourse } from '@/controllers/course';


const course = express.Router();

course.post('/', tracedAsyncHandler(addCourse));
course.post('/mycourse', tracedAsyncHandler(getAllMyCourses));
course.get('/', tracedAsyncHandler(getAllCourses));
course.get('/:id', tracedAsyncHandler(getOneCourse));
course.patch('/:id' ,tracedAsyncHandler(updateCourse));
course.delete('/:id', tracedAsyncHandler(removeCourse));

export default course;
