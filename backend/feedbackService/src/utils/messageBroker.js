import { MESSAGING_CONFIG } from "./config";
import { v4 as uuidv4 } from 'uuid';
import { moduleLogger } from '@sliit-foss/module-logger';
const amqp = require('amqplib');

const logger = moduleLogger('Messaging');

export const sendMessageToQueue = async (queueName, message) => {
    try {
        const connection = await amqp.connect(MESSAGING_CONFIG.URL);
        const channel = await connection.createChannel();
        const queue = MESSAGING_CONFIG[queueName];
        const correlationId = uuidv4();
        
        channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), {
            persistent: true,
            correlationId: correlationId
        });
     
        logger.info(`Message sent to ${queueName} Queue: ${JSON.stringify(message)}`);
        
        await channel.close();
        await connection.close();
    } catch (error) {
        console.error('Error sending message:', error);
        throw error; 
    }
}


export const sendMessageToQueueAndListen = async (queueName, message) => {
    try {
        const connection = await amqp.connect(MESSAGING_CONFIG.URL);
        const channel = await connection.createChannel();
        const queue = MESSAGING_CONFIG[queueName];
        const correlationId = uuidv4();
        const replyQueue = await channel.assertQueue('', { exclusive: true });
    
        const responsePromise = new Promise((resolve, reject) => {
            channel.consume(replyQueue.queue, (msg) => {
                if (msg.properties.correlationId === correlationId) {
                    const response = JSON.parse(msg.content.toString());
                    logger.info(`Received response: ${JSON.stringify(response)}`);
                    resolve(response);
                    connection.close();
                }
            }, { noAck: true });
        });
    
        channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), {
            persistent: true,
            correlationId: correlationId,
            replyTo: replyQueue.queue,
        });
     
        logger.info(`Message sent to ${queueName} Queue: ${JSON.stringify(message)}`);

        return responsePromise;
    } catch (error) {
        console.error('Error sending message:', error);
        throw error; 
    }
}