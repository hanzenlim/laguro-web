import authRoutes from './routes/authRoutes';
import hellosignRoutes from './routes/hellosignRoutes';
import get from 'lodash/get';

const express = require('express');
const cookieSession = require('cookie-session');
const passport = require('passport');
const path = require('path');
const bodyParser = require('body-parser');
const logger = require('morgan');
const makeQuery = require('./util/serverDataLoader').makeQuery;

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
    let variables;

    // Check if user is authenticated
    // req.user.id is comes from http-cookie. Http cookie is included in the request by the client.
    // Http cookie cannot be accessed by the browser.
    // Were checking
    if (
        req.user &&
        req.body &&
        req.body.variables &&
        req.body.variables.id === req.user.id
    ) {
        variables = {
            ...req.body.variables,
            authenticated: true,
        };
    } else {
        variables = {
            ...req.body.variables,
        };
    }

    const result = await makeQuery(req.body.query, variables);
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
