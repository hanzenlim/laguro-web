import app from './server';
import serverless from 'serverless-http';

// Start the serverless app
export const expressApp = serverless(app, {
    binary: ['image/png', 'image/jpeg', 'image/jpg'],
});
