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

const connectToRabbitMQ = async () => {
  try {
    return await amqp.connect(RABBIMQ_CONFIG.URL);
  } catch (error) {
    throw new Error(`Failed to connect to RabbitMQ: ${error.message}`);
  }
};

const validateUser = (userDetails) => {
  // Todo
  console.log('Validating user:', userDetails)
  const newUserDetails = { ...userDetails, valid: true };
  return newUserDetails;
}
