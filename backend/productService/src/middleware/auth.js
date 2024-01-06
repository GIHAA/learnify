// Import necessary modules and functions
import { asyncHandler } from '@sliit-foss/functions';
import { default as createError } from 'http-errors';
import { decodeJwtToken } from '@/utils';
import { sendMessageToUserQueue } from '@/utils/messageBroker';
const amqp = require('amqplib');

// Middleware to protect routes
export const protect = asyncHandler(async (req, res, next) => {
  const token = req.headers.authorization
    ? req.headers.authorization.startsWith('Bearer')
      ? req.headers.authorization.split(' ')[1]?.replace('null', '')?.replace('undefined', '')
      : null
    : null;

  if (!token) {
    return next(new createError(401, 'Unauthorized'));
  }

  const decodedUser = decodeJwtToken(token).data;

  try {
    const validationResponse = await sendMessageToUserQueue({ id: decodedUser._id, valid: false });
    if (!validationResponse.userValidated.valid) {
      return next(new createError(401, 'Unauthorized'));
    }
  } catch (error) {

    return next(new createError(401, 'Unauthorized'));
  }
});




export const adminProtect = asyncHandler((req) => {
  if (req.headers['x-api-key'] === process.env.API_ACCESS_KEY) return;
  if (req.user.role !== 'ADMIN') throw new createError(403, 'You are not permitted to access this resource');
});