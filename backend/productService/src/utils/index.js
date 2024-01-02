import context from 'express-http-context';

export * from './config';
export * from './json';
export * from './jwt';
export * from './response';

export const isFromAdmin = () => context.get('origin') === 'admin';

export const isProduction = process.env.APP_ENV === 'production';

export const rawRepoUrl = `https://raw.githubusercontent.com/GIHAA/af-project/${isProduction ? 'main' : 'develop'}`;
