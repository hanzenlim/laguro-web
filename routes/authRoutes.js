// External Packages
const passport = require('passport');

const authRoutes = app => {
    app.post('/api/signup', (req, res, next) => {
        return passport.authenticate('local-signup', (err, user, info) => {
            if (err) return next(err);

            req.logIn(user, err => {
                if (err) {
                    return res.status(403).json(info);
                }

                res.cookie('userId', user.id, { maxAge: 2592000000 });
                return res.status(200).json(user);
            });
        })(req, res, next);
    });

    app.post('/api/login', (req, res, next) => {
        return passport.authenticate('local-login', (err, user, info) => {
            if (err) return next(err);

            req.logIn(user, err => {
                if (err) {
                    return res.status(403).json(info);
                }

                res.cookie('userId', user.id, { maxAge: 2592000000 });
                return res.status(200).json(user);
            });
        })(req, res, next);
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
            res.cookie('userId', req.user.id, { maxAge: 2592000000 });
            res.redirect(req.session.returnTo);
        }
    );

    // visiting this route clears logged in user
    app.get('/api/logout', (req, res) => {
        req.logout();

        // Clears the user id cookie.
        res.cookie('userId', '');
        res.redirect('/');
    });
};

export default authRoutes;
