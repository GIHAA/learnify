import { moduleLogger } from '@sliit-foss/module-logger';
import { RABBIMQ_CONFIG } from './config';
const amqp = require('amqplib');

const logger = moduleLogger('RabbitMQ');
let connection;

export async function consumeUserValidationMessages() {
  try {
    connection = await connectToRabbitMQ();
    const channel = await connection.createChannel();
    const queue = RABBIMQ_CONFIG.USER_VALIDATION_QUEUE || 'feedback_validation_queue';

    logger.info('RabbitMQ connection successful');
    await channel.assertQueue(queue, { durable: true });

    channel.consume(queue, (message) => {
      try {
        const userDetails = JSON.parse(message.content.toString());

        logger.info(`Received message from User Service: ${JSON.stringify(userDetails)}`);
        const userValidated = validateUser(userDetails);

        logger.info(`Sending validation response: ${JSON.stringify(userValidated)}`);

        channel.sendToQueue(message.properties.replyTo, Buffer.from(JSON.stringify({ userValidated })), {
          correlationId: message.properties.correlationId
        });

        channel.ack(message);
      } catch (error) {
        logger.error('Error consuming message:', error);
      }
    });
  } catch (error) {
    logger.error('Error setting up RabbitMQ connection:', error);
    setTimeout(consumeUserValidationMessages, 5000);
  }
}

export const sendMessageToQueue = async ( queueName, message ) => {

  try {

      const connection = await connectToRabbitMQ();
 
      const channel = await connection.createChannel();
      
      await channel.assertQueue(queueName, { durable: true });
      
      channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)), {
          persistent: true 
      });
      
  } catch (error) {
      console.error("Error:", error);
  }
}



const connectToRabbitMQ = async () => {
  try {
    return await amqp.connect(RABBIMQ_CONFIG.URL);
  } catch (error) {
    throw new Error(`Failed to connect to RabbitMQ: ${error.message}`);
  }
};

const validateUser = (userDetails) => {
  const newUserDetails = { ...userDetails, valid: true };
  return newUserDetails;
}
