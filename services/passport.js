// External Packages
const serverDataLoader = require('../util/serverDataLoader');

const makeQuery = serverDataLoader.makeQuery;
const makeMutation = serverDataLoader.makeMutation;
const getUserQuery = serverDataLoader.getUserQuery;
const getUserVariable = serverDataLoader.getUserVariable;
const createUserQuery = serverDataLoader.createUserQuery;
const createUserVariable = serverDataLoader.createUserVariable;

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// Local Packages
const keys = require('../client/src/config/keys');

// Define passport functions
passport.serializeUser((user, done) => {
    done(null, user.googleId);
});

passport.deserializeUser(async (id, done) => {
    const result = await makeQuery(getUserQuery, getUserVariable(id));
    done(null, result.data.getUserByGoogleId);
});

passport.use(new GoogleStrategy(
    {
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback',
        proxy: true,
    },

    async (accessToken, refreshToken, profile, done) => {
        let result = await makeQuery(getUserQuery, getUserVariable(profile.id));

        if (result && result.data && result.data.getUserByGoogleId) {
            return done(null, result.data.getUserByGoogleId);
        }

        const imgUrl = profile.photos[0].value;
        const biggerImg = imgUrl.slice(0, -2).concat('300');

        // Create a brand new user.
        result = await makeMutation(createUserQuery, createUserVariable(
            profile.displayName,
            profile.id,
            biggerImg,
        ));

        done(null, result.data.createUser);
    },
));
