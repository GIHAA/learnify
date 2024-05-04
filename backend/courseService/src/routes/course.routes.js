import express from 'express';
import { tracedAsyncHandler } from '@sliit-foss/functions';
import { celebrate } from 'celebrate';
import { addCourse, getAllCourses , getOneCourse, removeCourse, updateCourse } from '@/controllers/course';
import { orderRequestAdd } from '@/validations/course';


const course = express.Router();

course.post('/', tracedAsyncHandler(addCourse));
course.get('/', tracedAsyncHandler(getAllCourses));
course.get('/:id', tracedAsyncHandler(getOneCourse));
course.patch('/:id' ,tracedAsyncHandler(updateCourse));
course.delete('/:id', tracedAsyncHandler(removeCourse));

export default course;
