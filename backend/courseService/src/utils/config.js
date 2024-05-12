import dotenv from 'dotenv';

dotenv.config();

export const MAIL_CREDENTIALS = {
  HOST: process.env.MAIL_HOST,
  USER: process.env.MAIL_USER,
  PASS: process.env.MAIL_PASSWORD
};

export const RABBIMQ_CONFIG = {
  URL: process.env.RABBITMQ_URL,
  USER_VALIDATION_QUEUE: 'user_validation_queue',
  EMAIL_QUEUE: 'email_queue',
};