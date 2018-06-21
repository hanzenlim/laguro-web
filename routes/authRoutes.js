// External Packages
const passport = require('passport');

const authRoutes = app => {
    // hit this route to start oauth process
    app.get(
        '/auth/google',
        (req, res, next) => {
            const referer = req.get('referer');
            if (!req.session) req.session = {};
            req.session.returnTo = referer;
            next();
        },
        passport.authenticate('google', {
            scope: ['profile', 'email'],
        })
    );

    // hit by goog OAuth post-auth
    app.get(
        '/auth/google/callback',
        passport.authenticate('google'),
        (req, res) => {
            res.cookie('userId', req.user.googleId, { maxAge: 2592000000 });
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
