import { moduleLogger } from '@sliit-foss/module-logger';
import { RABBIMQ_CONFIG } from './config';
import sendEmail from '@/service/email';
import { sendSms } from '@/service/sms';

const amqp = require('amqplib');

const logger = moduleLogger('RabbitMQ');
let connection;

export async function consumeEmailRequestMessages() {
  try {
    connection = await connectToRabbitMQ();
    const channel = await connection.createChannel();
    const queue = RABBIMQ_CONFIG.EMAIL_REQUEST_QUEUE || 'email_request_queue_2';

    logger.info('RabbitMQ connection successful');
    await channel.assertQueue(queue, { durable: true });

    channel.consume(queue, async (message) => {
      try {
        const emaiDetails = JSON.parse(message.content.toString());
        logger.info(`Notification Request Recieved: `);
        
        const emailSent = await sendEmail(emaiDetails);
        const smsSent = sendSms(emaiDetails);
       if(emailSent){
        channel.ack(message);
       }
      } catch (error) {
        logger.error('Error consuming message:', error);
      }
    });
  } catch (error) {
    logger.error('Error setting up RabbitMQ connection:', error);
    setTimeout(consumeEmailRequestMessages, 5000); 
  }
}

const connectToRabbitMQ = async () => {
  try {
    return await amqp.connect(RABBIMQ_CONFIG.URL);
  } catch (error) {
    throw new Error(`Failed to connect to RabbitMQ: ${error.message}`);
  }
};

