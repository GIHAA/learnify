import context from 'express-http-context';

export * from './config';
export * from './json';
export * from './jwt';
export * from './response';

export const isFromAdmin = () => context.get('origin') === 'admin';

export const isFeedbackion = process.env.APP_ENV === 'feedbackion';

export const rawRepoUrl = `https://raw.githubusercontent.com/GIHAA/af-project/${isFeedbackion ? 'main' : 'develop'}`;
