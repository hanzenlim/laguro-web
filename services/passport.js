import bcrypt from 'bcrypt';

// External Packages
const serverDataLoader = require('../util/serverDataLoader');

const makeQuery = serverDataLoader.makeQuery;
const makeMutation = serverDataLoader.makeMutation;
const getUserQuery = serverDataLoader.getUserQuery;
const getUserVariable = serverDataLoader.getUserVariable;
const getUserByEmailQuery = serverDataLoader.getUserByEmailQuery;
const getUserByEmailVariable = serverDataLoader.getUserByEmailVariable;
const createUserQuery = serverDataLoader.createUserQuery;
const createUserVariable = serverDataLoader.createUserVariable;

const createLocalUserQuery = serverDataLoader.createLocalUserQuery;
const createLocalUserVariable = serverDataLoader.createLocalUserVariable;

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LocalStrategy = require('passport-local').Strategy;

// Define passport functions
passport.serializeUser((user, done) => {
    return done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const result = await makeQuery(getUserQuery, getUserVariable(id));
    done(null, result.data.getUser);
});

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: '/auth/google/callback',
            proxy: true,
        },

        async (accessToken, refreshToken, profile, done) => {
            let result = await makeQuery(
                getUserQuery,
                getUserVariable(profile.id)
            );

            if (result && result.data && result.data.getUserByGoogleId) {
                return done(null, result.data.getUserByGoogleId);
            }

            const imgUrl = profile.photos[0].value;
            const biggerImg = imgUrl.slice(0, -2).concat('300');

            const email = profile.emails[0].value;

            // Create a brand new user.
            result = await makeMutation(
                createUserQuery,
                createUserVariable(
                    profile.name.givenName,
                    profile.name.familyName,
                    profile.id,
                    email,
                    biggerImg
                )
            );

            done(null, result.data.createUser);
        }
    )
);

passport.use(
    'local-signup',
    new LocalStrategy(
        { passReqToCallback: true },
        async (req, username, password, done) => {
            const result = await makeQuery(
                getUserByEmailQuery,
                getUserByEmailVariable(username)
            );

            const getUserByEmail =
                result && result.data && result.data.getUserByEmail;

            if (getUserByEmail) {
                return done(null, false, {
                    message: 'This email address is already registered.',
                });
            }

            bcrypt.genSalt(10, async (err, salt) => {
                if (err) return done(err);

                bcrypt.hash(password, salt, async (err, hashedPassword) => {
                    if (err) return done(err);

                    const result = await makeMutation(
                        createLocalUserQuery,
                        createLocalUserVariable(
                            req.body.firstName,
                            req.body.lastName,
                            hashedPassword,
                            username
                        )
                    );

                    const createLocalUser =
                        result && result.data && result.data.createLocalUser;

                    done(null, createLocalUser);
                });
            });
        }
    )
);

passport.use(
    'local-login',
    new LocalStrategy(
        { passReqToCallback: true },
        async (req, username, password, done) => {
            const result = await makeQuery(
                getUserByEmailQuery,
                getUserByEmailVariable(username)
            );

            const getUserByEmail =
                result && result.data && result.data.getUserByEmail;

            if (!getUserByEmail) {
                return done(null, false, {
                    message: 'Invalid username/password.',
                });
            }

            if (getUserByEmail && getUserByEmail.googleId) {
                return done(null, false, {
                    message:
                        'Either the credentials you supplied are invalid, or you signed up using an OpenID provider, such as Google.',
                });
            }

            if (
                !bcrypt.compareSync(
                    password,
                    getUserByEmail && getUserByEmail.password
                )
            ) {
                return done(null, false, {
                    message: 'Invalid username/password.',
                });
            }

            done(null, getUserByEmail);
        }
    )
);
