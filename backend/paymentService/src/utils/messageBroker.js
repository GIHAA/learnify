import { RABBIMQ_CONFIG } from "./config";
import { v4 as uuidv4 } from 'uuid';
import { moduleLogger } from '@sliit-foss/module-logger';
const amqp = require('amqplib');

const logger = moduleLogger('RabbitMQ');

export const sendMessageToUserQueue = async (userDetails) => {
    try {
        const connection = await amqp.connect(RABBIMQ_CONFIG.URL);
        const channel = await connection.createChannel();
        const queue = RABBIMQ_CONFIG.USER_VALIDATION_QUEUE || 'user_validation_queue';
        const correlationId = uuidv4();
        const replyQueue = await channel.assertQueue('', { exclusive: true });
    
        const validationPromise = new Promise((resolve, reject) => {
        channel.consume(replyQueue.queue, (message) => {
            if (message.properties.correlationId === correlationId) {
            const userValidated = JSON.parse(message.content.toString());
            logger.info(`Received validation response: ${JSON.stringify(userValidated)}`);
            resolve(userValidated);
            connection.close();
            }
        }, { noAck: true });
        });
    
        channel.sendToQueue(queue, Buffer.from(JSON.stringify(userDetails)), {
        persistent: true,
        correlationId: correlationId,
        replyTo: replyQueue.queue,
        });
     
        logger.info(`Message sent to User Service Queue: ${JSON.stringify(userDetails)}`);

        return validationPromise;
    } catch (error) {
        console.error('Error sending message:', error);
        throw error; 
    }
}