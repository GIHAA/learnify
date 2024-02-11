import { initializeApp } from 'firebase/app';

import config from './database.js';

export const initializeFirebaseApp = async () => {
  try {
    await initializeApp(config.firebaseConfig);
    console.log('Firebase initialized successfully');
  } catch (error) {
    console.error('Firebase initialization error:', error.stack);
    process.exit(1);
  }
};
