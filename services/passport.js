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
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
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

        const email = profile.emails[0].value;

        // Create a brand new user.
        result = await makeMutation(createUserQuery, createUserVariable(
            profile.name.givenName,
            profile.name.familyName,
            profile.id,
            email,
            biggerImg,
        ));

        done(null, result.data.createUser);
    },
));
