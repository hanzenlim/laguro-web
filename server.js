// Polyfill Node with `Intl` that has data for all locales.
// See: https://formatjs.io/guides/runtime-environments/#server
require('dotenv').config();

const IntlPolyfill = require('intl');

Intl.NumberFormat = IntlPolyfill.NumberFormat;
Intl.DateTimeFormat = IntlPolyfill.DateTimeFormat;
const path = require('path');

const express = require('express');
const next = require('next');
const accepts = require('accepts');
const glob = require('glob');
const { readFileSync } = require('fs');
const { basename } = require('path');
const isEmpty = require('lodash/isEmpty');
const expressStaticGzip = require('express-static-gzip');

const siteMapRoutes = require('./apiRoutes/siteMapRoutes');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// Get the supported languages by looking for translations in the `lang/` dir.
const supportedLanguages = glob
    .sync('./lang/*.json')
    .map(f => basename(f, '.json'));

// We need to expose React Intl's locale data on the request for the user's
// locale. This function will also cache the scripts by lang in memory.
const localeDataCache = new Map();
const getLocaleDataScript = locale => {
    const lang = locale.split('-')[0];
    if (!localeDataCache.has(lang)) {
        const localeDataFile = require.resolve(
            `@formatjs/intl-relativetimeformat/dist/locale-data/${lang}`
        );
        const localeDataScript = readFileSync(localeDataFile, 'utf8');
        localeDataCache.set(lang, localeDataScript);
    }
    return localeDataCache.get(lang);
};

// We need to load and expose the translations on the request for the user's
// locale. These will only be used in production, in dev the `defaultMessage` in
// each message description in the source code will be used.
const getMessages = locale => require(`./lang/${locale}.json`);

function parseCookies(request) {
    const list = {};

    if (request && !isEmpty(request.headers) && request.headers.cookie) {
        request.headers.cookie.split(';').forEach(cookie => {
            const parts = cookie.split('=');
            list[parts.shift().trim()] = decodeURI(parts.join('='));
        });
    }

    return list;
}

app.prepare().then(() => {
    const server = express();

    siteMapRoutes(server);

    server.use((req, res, nextMiddleware) => {
        const { lang } = req.query;
        const cookies = parseCookies(req);

        const accept = accepts(req);
        const locale =
            lang ||
            cookies.locale ||
            accept.language(accept.languages(supportedLanguages)) ||
            'en';
        req.locale = locale;
        req.localeDataScript = getLocaleDataScript(locale);
        req.messages = getMessages(locale);

        nextMiddleware();
    });

    // the middleware used to serve .br and .gz files instead of js
    server.use(
        expressStaticGzip(__dirname, {
            enableBrotli: true,
            orderPreference: ['br', 'gz'],
            index: false,
        })
    );

    server.get('/review/:id', (req, res) => {
        const { id } = req.params;

        return app.render(req, res, '/review', { id, ...req.query });
    });

    server.get('/dashboard*', (req, res) => {
        app.render(req, res, '/dashboard', req.query);
    });

    server.get('/kiosk*', (req, res) => {
        app.render(req, res, '/kiosk', req.query);
    });

    server.get('/patient-onboarding*', (req, res) => {
        app.render(req, res, '/patient-onboarding', req.query);
    });

    server.get('/host-onboarding*', (req, res) => {
        app.render(req, res, '/host-onboarding', req.query);
    });

    server.get('/onboarding/terms', (req, res) => {
        app.render(req, res, '/onboarding-terms', req.query);
    });

    server.get('/onboarding/dentist/verification', (req, res) => {
        app.render(req, res, '/onboarding-dentist-verification', req.query);
    });

    server.get('/onboarding/dentist/profile', (req, res) => {
        app.render(req, res, '/onboarding-dentist-profile', req.query);
    });

    server.get('/dentist/:id', (req, res) => {
        const { id } = req.params;

        if (id === 'search') {
            return app.render(req, res, '/dentist-search', req.query);
        }

        return app.render(req, res, '/dentist', { id, ...req.query });
    });

    server.get('/office/:id', (req, res) => {
        const { id } = req.params;

        if (id === 'search') {
            return app.render(req, res, '/office-search', req.query);
        }

        return app.render(req, res, '/office', { id });
    });

    server.get('/manifest.json', (req, res) => {
        res.sendFile(path.resolve('static', 'manifest.json'));
    });

    server.get('/serviceworker.js', (req, res) => {
        res.sendFile(path.resolve('static', 'serviceworker.js'));
    });

    server.get('/robots.txt', (req, res) => {
        if (process.env.APP_ENV === 'stage') {
            res.send('User-agent: *\nDisallow: /');
        } else {
            res.sendFile(path.resolve('static', 'robots.txt'));
        }
    });

    server.get('*.js', (req, res, next) => {
        if (req.header('Accept-Encoding').includes('br')) {
            req.url = req.url + '.br';
            res.set('Content-Encoding', 'br');
            res.set('Content-Type', 'application/javascript; charset=UTF-8');
        }
        next();
    });

    server.get('*', (req, res) => {
        res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.header('Pragma', 'no-cache');

        if (process.env.APP_ENV === 'stage') {
            res.header('X-Robots-Tag', 'noindex');
        }

        handle(req, res);
    });

    server.listen(port, err => {
        if (err) throw err;
        console.log(`> Ready on http://localhost:${port}`);
    });
});
