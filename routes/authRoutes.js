// External Packages
import { makeQuery, getUserQuery, getUserVariable } from '../util/serverDataLoader';

const passport = require('passport');
const mongoose = require('mongoose');

const User = mongoose.model('users');

module.exports = (app) => {
    // hit this route to start oauth process
    app.get(
        '/auth/google',
        passport.authenticate('google', {
            scope: ['profile', 'email'],
        }),
    );

    // hit by goog OAuth post-auth
    app.get(
        '/auth/google/callback',
        passport.authenticate('google'),
        (req, res) => {
            res.cookie('userId', req.user.googleId, { maxAge: 2592000000 });
            res.redirect('/profile');
        },
    );

    // visiting this route clears logged in user
    app.get('/api/logout', (req, res) => {
        req.logout();

        // Clears the user id cookie.
        res.cookie('userId', '');
        res.redirect('/');
    });

    app.get('/api/current_user', async (req, res) => {
        if (req.user) {
            const result = await makeQuery(getUserQuery, getUserVariable(req.user.googleId));
            res.send(result.data);

            return;
        }

        res.send(req.user);
    });

    // use this route to update the user profile image
    app.patch('/api/current_user/image', (req, res) => {
        User.findByIdAndUpdate(req.user._id, { $set: { img: req.body.url } }, { new: true }, (err, user) => {
            res.send(user);
        });
    });

    // returns a list of all users
    app.get('/api/users', async (req, res) => {
        const userList = await User.find();
        res.send(userList);
    });
};
