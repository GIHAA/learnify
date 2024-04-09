import express from 'express';
import { tracedAsyncHandler } from '@sliit-foss/functions';
import { celebrate } from 'celebrate';
import { addFeedback, getAll, getById, remove, update } from '@/controllers/feedback';

const feedback = express.Router();

feedback.post('/', tracedAsyncHandler(addFeedback));
feedback.get('/', tracedAsyncHandler(getAll));
feedback.get('/:id', tracedAsyncHandler(getById));
feedback.patch('/:id' ,tracedAsyncHandler(update));
feedback.delete('/:id', tracedAsyncHandler(remove));

export default feedback;
