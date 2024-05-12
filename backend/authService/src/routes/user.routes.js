import express from 'express';
import { tracedAsyncHandler } from '@sliit-foss/functions';
import { Segments, celebrate } from 'celebrate';
import { changePassword, create, sendnotification , getAll, getById, update,remove } from '@/controllers/user';
import { protect,adminProtect } from '@/middleware/auth';

import {
  changePasswordSchema,
  userIdSchema
} from '@/validations/user';

const users = express.Router();


users.post('/notify',   tracedAsyncHandler(sendnotification));
users.post('/', tracedAsyncHandler(create));
users.get('/',  tracedAsyncHandler(getAll));
users.get('/:id', celebrate({ [Segments.PARAMS]: userIdSchema }), adminProtect, tracedAsyncHandler(getById));
users.patch(
  '/change_password',
  celebrate({ [Segments.BODY]: changePasswordSchema }),
  tracedAsyncHandler(changePassword)
);
users.patch(
  '/:id',
  tracedAsyncHandler(update)
);
users.delete('/:id',  tracedAsyncHandler(remove));
users.delete('/me/:id', protect, tracedAsyncHandler(remove));

export default users;
