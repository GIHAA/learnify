import { moduleLogger } from '@sliit-foss/module-logger';
import { RABBIMQ_CONFIG } from './config';
const amqp = require('amqplib');

const logger = moduleLogger('RabbitMQ');
let connection;

export async function consumeUserValidationMessages() {
  try {
    connection = await connectToRabbitMQ();
    const channel = await connection.createChannel();
    const queue = RABBIMQ_CONFIG.USER_VALIDATION_QUEUE || 'user_validation_queue';

    logger.info('RabbitMQ connection successful');
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
    logger.error('Error setting up RabbitMQ connection:', error);
    // Attempt to reconnect after a delay
    setTimeout(consumeUserValidationMessages, 5000); // Reconnect after 5 seconds
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
  // Replace this with your actual validation logic
  // Here, we preserve the original validation status
  const newUserDetails = { ...userDetails, valid: true };
  return newUserDetails;
}
