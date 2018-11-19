import authRoutes from './routes/authRoutes';
import hellosignRoutes from './routes/hellosignRoutes';

const express = require('express');
const cookieSession = require('cookie-session');
const passport = require('passport');
const path = require('path');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors');
const prerenderNode = require('prerender-node');

const { makeQuery } = require('./util/serverDataLoader');
const { generateToken, COOKIE_EXPIRATION } = require('./util/token');

// Services
require('./services/passport');

// Middleware start
const app = express();
app.use(bodyParser.json());

// Auth config
app.use(
    cookieSession({
        maxAge: COOKIE_EXPIRATION,
        keys: [process.env.COOKIE_KEY],
    })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.options('/api/graphql', cors());

if (process.env.NODE_ENV === 'production') {
    const prerender = prerenderNode.set(
        'prerenderToken',
        process.env.PRERENDER_TOKEN
    );
    prerender.crawlerUserAgents.push('googlebot');
    prerender.crawlerUserAgents.push('bingbot');
    prerender.crawlerUserAgents.push('yandex');
    app.use(prerender);
}

app.post('/api/graphql', cors(), async (req, res) => {
    const context = {};

    // append incoming JWT tokens to the header and pass thru to backend for external access to graphql api
    if (req.headers && req.headers.authorization) {
        context.headers = {
            authorization: req.headers.authorization,
        };
    }

    if (req.user) {
        const { id, email, dentistId } = req.user;
        const user = { id, email, dentistId };
        const token = generateToken(user);

        context.headers = {
            Authorization: `bearer ${token}`,
        };
    }

    try {
        const result = await makeQuery(
            req.body.query,
            req.body.variables,
            context
        );
        res.send(JSON.stringify(result));
    } catch (e) {
        res.send(JSON.stringify(e));
    }
});

// Route Files
authRoutes(app);
hellosignRoutes(app);

if (process.env.NODE_ENV === 'production') {
    if (process.env.APP_ENV === 'stage') {
        app.get('/robots.txt', (req, res) => {
            res.send('User-agent: *\nDisallow: /');
        });
    } else {
        app.get('/robots.txt', (req, res) => {
            res.sendFile(path.resolve('build', 'robots.txt'));
        });
    }

    app.get('*', (req, res) => {
        res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.header('Pragma', 'no-cache');

        if (process.env.APP_ENV === 'stage') {
            res.header('X-Robots-Tag', 'noindex');
        }

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
