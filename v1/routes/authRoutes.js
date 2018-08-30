import bcrypt from 'bcryptjs';

// External Packages
const passport = require('passport');
const serverDataLoader = require('../util/serverDataLoader');

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
                return res.json({ status: 403, info });
            }

            res.cookie('user', JSON.stringify(user), {
                maxAge: 2592000000,
            });
            return res.json({ status: 200, user });
        })(req, res, next)
    );

    app.post('/api/login', (req, res, next) =>
        passport.authenticate('local-login', (err, user, info) => {
            if (err || !user) {
                return res.json({ status: 403, info });
            }

            res.cookie('user', JSON.stringify(user), {
                maxAge: 2592000000,
            });
            return res.json({ status: 200, user });
        })(req, res, next)
    );

    app.post('/api/forgot-password', async (req, res) => {
        const username = req.body.email;

        const result = await makeQuery(
            getUserByEmailQuery,
            getUserByEmailVariable(username)
        );

        const { getUserByEmail } = result && result.data;

        if (getUserByEmail) {
            if (getUserByEmail && getUserByEmail.googleId) {
                return res.status(403).json({
                    message:
                        'Either the credentials you supplied are invalid, or you signed up using an OpenID provider, such as Google.',
                });
            }

            makeMutation(
                createResetPasswordRequestQuery,
                createResetPasswordRequestVariable(username)
            );

            return res.status(200).json({
                message: 'Email sent.',
            });
        }
        return res.status(403).json({
            message: 'Invalid login credentials.',
        });
    });

    // Checks status of reset password request.
    // Updates user password if link is not yet used or more then 24 hours.
    app.post('/api/reset-password', async (req, res) => {
        const { id, token, password } = req && req.body;

        const result = await makeQuery(
            getResetPasswordRequestQuery,
            getResetPasswordRequestVariable(id)
        );

        const { getResetPasswordRequest } = result && result.data;

        if (getResetPasswordRequest.status === 'EXPIRED') {
            return res.status(400).json({
                message: 'Reset password request already expired.',
            });
        }

        if (getResetPasswordRequest.status === 'USED') {
            return res.status(400).json({
                message: 'Reset password request already used.',
            });
        }

        bcrypt.genSalt(10, async (err, salt) => {
            if (err) {
                return res.status(403).json({
                    message: 'Invalid request.',
                });
            }

            bcrypt.hash(password, salt, async (err, hashedPassword) => {
                if (err) {
                    return res.status(403).json({
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
                        res.status(400).json({
                            message: 'Reset password request already expired.',
                        });
                    } else {
                        return res.status(200).json(useResetPasswordRequest);
                    }
                } else {
                    return res.status(400).json({
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
            res.cookie('user', JSON.stringify(req.user), {
                maxAge: 2592000000,
            });
            res.redirect(req.session.returnTo);
        }
    );
};

export default authRoutes;
