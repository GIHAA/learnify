import { moduleLogger } from '@sliit-foss/module-logger';
import { v4 as uuidv4 } from 'uuid';
import { RABBIMQ_CONFIG } from './config';
const amqp = require('amqplib');

const logger = moduleLogger('RabbitMQ');

export async function consumeUserValidationMessages() {
  try {
    const connection = await amqp.connect(RABBIMQ_CONFIG.URL);
    const channel = await connection.createChannel();
    const queue = RABBIMQ_CONFIG.USER_VALIDATION_QUEUE || 'user_validation_queue';

    // Ensure the queue exists before consuming
    await channel.assertQueue(queue, { durable: true });

    channel.consume(queue, (message) => {
      try {
        const userDetails = JSON.parse(message.content.toString());
    
        logger.info(`Received message from User Service: ${JSON.stringify(userDetails)}`);
        // Validate user logic here
        const userValidated = validateUser(userDetails);

        logger.info(`Sending validation response: ${JSON.stringify(userValidated)}`);
        
        // Respond to the Product Service
        channel.sendToQueue(message.properties.replyTo, Buffer.from(JSON.stringify({ userValidated })), {
          correlationId: message.properties.correlationId
        });

        channel.ack(message);
      } catch (error) {
        logger.error('Error consuming message:', error);
        // Optionally, you can nack or handle the error accordingly
      }
    });
  } catch (error) {
    console.error('Error setting up RabbitMQ connection:', error);
    process.exit(1); // Exit the application if RabbitMQ setup fails
  }
}

const  validateUser = (userDetails) => {
  // Replace this with your actual validation logic
  // Here, we preserve the original validation status
  const newUserDetails = { ...userDetails, valid: true };
  return newUserDetails;
}
