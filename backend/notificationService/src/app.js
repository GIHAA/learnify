import express from 'express';
import context from 'express-http-context';
import rateLimit from 'express-rate-limit';
import httpLogger from '@sliit-foss/http-logger';
import { moduleLogger } from '@sliit-foss/module-logger';
import compression from 'compression';
import cors from 'cors';
import crypto from 'crypto';
import helmet from 'helmet';
import { omit, pick } from 'lodash';
import { consumeEmailRequestMessages } from './utils/messageBroker';
import { Server } from 'socket.io';
import { createServer } from 'http'; // Import http to create a server instance

require('dotenv').config();

const app = express(); // Create an instance of the Express application
const logger = moduleLogger('app');

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false
});

app.use(limiter);
app.use(helmet({
  crossOriginEmbedderPolicy: false,
  contentSecurityPolicy: {
    directives: {
      'img-src': ["'self'", 'https: data:']
    }
  }
}));
app.use(compression());
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('Assert'));
// app.use((req, _res, next) => {
//   context.set('correlationId', req.headers['x-correlation-id'] ?? crypto.randomBytes(16).toString('hex'));
//   context.set('origin', req.headers['x-origin-application']);
//   next();
// });
app.use(httpLogger({
  loggable: ({ headers, body: payload }) => ({
    headers: pick(headers, ['x-user-email', 'user-agent']),
    payload: omit(payload, ['password', 'new_password', 'old_password'])
  })
}));

// const server = createServer(app); // Create an HTTP server instance using Express

// Integrate Socket.IO with the HTTP server
// const io = new Server(server, {
//   cors: {
//     origin: "*",
//   },
// });

// // Socket.IO event handling logic
// let onlineUsers = [];

// const addNewUser = (username, socketId) => {
//   !onlineUsers.some((user) => user.username === username) &&
//     onlineUsers.push({ username, socketId });
// };

// const removeUser = (socketId) => {
//   onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
// };

// const getUser = (username) => {
//   return onlineUsers.find((user) => user.username === username);
// };

// io.on("connection", (socket) => {

//   socket.on("newUser", (username) => {
//     console.log("New user added: ", username);
//     addNewUser(username, socket.id);
//   });

//   socket.on("sendNotification", ({ senderName, receiverName, type }) => {
//     const receiver = getUser(receiverName);
//     io.to(receiver.socketId).emit("getNotification", {
//       senderName,
//       type,
//     });
//   });

//   socket.on("sendText", ({ senderName, receiverName, text }) => {
//     const receiver = getUser(receiverName);
//     io.to(receiver.socketId).emit("getText", {
//       senderName,
//       text,
//     });
//   });

//   socket.on("disconnect", () => {
//     removeUser(socket.id);
//   });
// });

// const port = process.env.PORT || 3005;
// server.listen(port, (err) => {
//   if (!err) {
//     logger.info(`Server started on port ${port}`);
//   }
// });

consumeEmailRequestMessages();
