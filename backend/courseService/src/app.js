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
import { default as connectDB } from '@/database';
import { errorHandler, queryMapper, responseInterceptor } from '@/middleware';
import { default as routes } from '@/routes/index.routes';

require('dotenv').config();

const logger = moduleLogger('app');

const app = express();

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false
});

app.use(limiter);

app.use(
  helmet({
    crossOriginEmbedderPolicy: false,
    contentSecurityPolicy: {
      directives: {
        'img-src': ["'self'", 'https: data:']
      }
    }
  })
);

app.use(compression());

app.use(cors({ origin: true, credentials: true }));

app.use(express.json({ limit: '1mb' }));

app.use(express.urlencoded({ extended: true }));

app.use(express.static('Assert'))

app.get('/course/health', (_, res) => res.status(200).json({ message: 'Course service and Running' }));

app.use(context.middleware);

app.use(
  httpLogger({
    loggable: ({ headers, body: payload }) => ({
      headers: pick(headers, ['x-user-email', 'user-agent']),
      payload: omit(payload, ['password', 'new_password', 'old_password'])
    })
  })
);

app.use(queryMapper);

app.use('/course/api', routes);

app.use(responseInterceptor);

app.use(errorHandler);

connectDB();

global.__basedir = __dirname;

const port = process.env.PORT || 3002;
app.listen(port, (err) => {
  if (!err) {
    logger.info(`Course service successfully started on port ${port}`);
  }
});
