import app from './server';
import serverless from 'serverless-http';

// Start the serverless app
exports.expressApp = serverless(app, {
    binary: ['image/png', 'image/jpeg', 'image/jpg']
});
