import dotenv from 'dotenv';

dotenv.config();

export const MAIL_CREDENTIALS = {
  HOST: process.env.MAIL_HOST,
  USER: process.env.MAIL_USER,
  PASS: process.env.MAIL_PASSWORD
};

export const RABBIMQ_CONFIG = {
  URL: process.env.RABBITMQ_URL,
  EMAIL_REQUEST_QUEUE : 'email_request_queue',
};