import bcrypt from 'bcryptjs';

const cors = require('cors');

// External Packages
const passport = require('passport');
const serverDataLoader = require('../util/serverDataLoader');
const { generateToken, COOKIE_EXPIRATION } = require('../util/token');

const {
    makeQuery,
    makeMutation,
    getUserByEmailQuery,
    getUserByEmailVariable,
    createResetPasswordRequestQuery,
    createResetPasswordRequestVariable,
    useResetPasswordRequestQuery,
    useResetPasswordRequestVariable,
    getResetPasswordRequestQuery,
    getResetPasswordRequestVariable,
} = serverDataLoader;

const authRoutes = app => {
    app.post('/api/signup', (req, res, next) =>
        passport.authenticate('local-signup', (err, user, info) => {
            if (err || !user) {
                return res.json({ status: 403, message: info.message });
            }

            res.cookie('user', JSON.stringify({ ...user, imageUrl: null }), {
                maxAge: 86400000,
            });

            req.login(user, loginError => {
                if (loginError) {
                    return next(err);
                }
                return res.json({ status: 200, user });
            });
        })(req, res, next)
    );

    app.post(
        '/api/ehr-login',
        cors({ origin: true, optionsSuccessStatus: 200 }),
        (req, res, next) =>
            passport.authenticate('ehr-login', (err, user, info) => {
                if (err || !user) {
                    return res.json({ status: 403, message: info.message });
                }

                res.cookie('user', JSON.stringify(user), {
                    maxAge: COOKIE_EXPIRATION,
                });

                req.login(user, loginError => {
                    if (loginError) {
                        return next(err);
                    }
                    return res.json({
                        status: 200,
                        user,
                        authToken: generateToken(user),
                    });
                });
            })(req, res, next)
    );

    app.post('/api/login', (req, res, next) =>
        passport.authenticate('local-login', (err, user, info) => {
            if (err || !user) {
                return res.json({ status: 403, message: info.message });
            }

            res.cookie('user', JSON.stringify(user), {
                maxAge: 86400000,
            });

            req.login(user, loginError => {
                if (loginError) {
                    return next(err);
                }
                return res.json({ status: 200, user });
            });
        })(req, res, next)
    );

    app.post('/api/logout', (req, res) => {
        // Will remove the express session
        req.session = null;

        // Will remove the req.user by passport.
        req.logout();

        res.clearCookie('user');

        return res.json({ status: 200 });
    });

    app.post('/api/forgot-password', async (req, res) => {
        const username = req.body.email;

        const result = await makeQuery(
            getUserByEmailQuery,
            getUserByEmailVariable(username)
        );

        const { getUserByEmail } = result && result.data;

        if (getUserByEmail) {
            if (getUserByEmail && getUserByEmail.googleId) {
                return res.json({
                    status: 403,
                    message:
                        'Either the credentials you supplied are invalid, or you signed up using an OpenID provider, such as Google.',
                });
            }

            makeMutation(
                createResetPasswordRequestQuery,
                createResetPasswordRequestVariable(username)
            );

            return res.json({
                status: 200,
                message: 'Email sent.',
            });
        }
        return res.json({
            status: 403,
            message: 'Invalid login credentials.',
        });
    });

    // Checks status of reset password request.
    // Updates user password if link is not yet used or more then 24 hours.
    app.post('/api/reset-password', async (req, res) => {
        const { id, token, password, passwordConfirmation } = req.body;

        if (password !== passwordConfirmation) {
            return res.json({
                status: 400,
                message: 'Passwords do not match.',
            });
        }

        const result = await makeQuery(
            getResetPasswordRequestQuery,
            getResetPasswordRequestVariable(id)
        );

        const { getResetPasswordRequest } = result && result.data;

        if (getResetPasswordRequest.status === 'EXPIRED') {
            return res.json({
                status: 400,
                message: 'Reset password request already expired.',
            });
        }

        if (getResetPasswordRequest.status === 'USED') {
            return res.json({
                status: 400,
                message: 'Reset password request already used.',
            });
        }

        bcrypt.genSalt(10, async (err, salt) => {
            if (err) {
                return res.json({
                    status: 403,
                    message: 'Invalid request.',
                });
            }

            bcrypt.hash(password, salt, async (err, hashedPassword) => {
                if (err) {
                    return res.json({
                        status: 403,
                        message: 'Invalid request.',
                    });
                }

                const result = await makeMutation(
                    useResetPasswordRequestQuery,
                    useResetPasswordRequestVariable(id, token, hashedPassword)
                );

                const { useResetPasswordRequest } = result && result.data;

                if (useResetPasswordRequest) {
                    if (useResetPasswordRequest.status === 'EXPIRED') {
                        res.json({
                            status: 400,
                            message: 'Reset password request already expired.',
                        });
                    } else {
                        return res.json({
                            status: 200,
                            useResetPasswordRequest,
                        });
                    }
                } else {
                    return res.json({
                        status: 400,
                        message: 'Invalid request.',
                    });
                }
            });
        });
    });

    app.get(
        '/auth/google',
        (req, res, next) => {
            const referer = req.get('referer');
            if (!req.session) req.session = {};
            req.session.returnTo = referer;
            next();
        },
        passport.authenticate('google', {
            prompt: 'select_account',
            scope: ['profile', 'email'],
        })
    );

    // hit by goog OAuth post-auth
    app.get(
        '/auth/google/callback',
        passport.authenticate('google'),
        (req, res) => {
            console.log('new googl user signup::', req.user);

            res.cookie('user', JSON.stringify(req.user), {
                maxAge: 86400000,
            });
            res.redirect(req.session.returnTo);
        }
    );
};

export default authRoutes;
