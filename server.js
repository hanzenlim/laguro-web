import authRoutes from './routes/authRoutes';
import hellosignRoutes from './routes/hellosignRoutes';

const express = require('express');
const cookieSession = require('cookie-session');
const passport = require('passport');
const path = require('path');
const bodyParser = require('body-parser');
const logger = require('morgan');
const jwt = require('jsonwebtoken');

const { makeQuery } = require('./util/serverDataLoader');

// Services
require('./services/passport');

// Middleware start
const app = express();
app.use(bodyParser.json());

// Auth config
app.use(
    cookieSession({
        maxAge: 10800000, // 1 day
        keys: [process.env.COOKIE_KEY],
    })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/graphql', async (req, res) => {
    const context = {};

    if (req.user) {
        const { id, email, dentistId } = req.user;
        const user = { id, email, dentistId };
        const token = jwt.sign({ user }, process.env.SHARED_SERVER_SECRET);

        context.headers = {
            authorization: `bearer ${token}`,
        };
    }

    const result = await makeQuery(req.body.query, req.body.variables, context);
    res.send(JSON.stringify(result));
});

// Route Files
authRoutes(app);
hellosignRoutes(app);

if (process.env.NODE_ENV === 'production') {
    app.get('/robots.txt', (req, res) => {
        res.sendFile(path.resolve('build', 'robots.txt'));
    });

    app.get('*', (req, res) => {
        res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.header('Pragma', 'no-cache');

        res.sendFile(path.resolve('build', 'index.html'));
    });
} else {
    // express will serve production assets
    app.use(express.static('client/build'));

    // express will serve index.html if route is unrecognizable
    app.get('*', (req, res) => {
        res.sendFile(path.resolve('client', 'build', 'index.html'));
    });
}

module.exports = app;
