import bcrypt from 'bcryptjs';

// External Packages
const serverDataLoader = require('../util/serverDataLoader');

const {
    makeQuery,
    makeMutation,
    getUserQuery,
    getUserByGoogleIdQuery,
    getUserVariable,
    getUserByGoogleIdVariable,
    getUserByEmailQuery,
    getUserByEmailVariable,
    createGoogleUserQuery,
    createGoogleUserVariable,
    createLocalUserQuery,
    createLocalUserVariable,
    updateUserVariable,
    updateUserQuery,
} = serverDataLoader;

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LocalStrategy = require('passport-local').Strategy;

// Define passport functions
passport.serializeUser((user, done) => done(null, user.id));

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
                getUserByGoogleIdQuery,
                getUserByGoogleIdVariable(profile.id)
            );

            if (result && result.data && result.data.getUserByGoogleId) {
                return done(null, result.data.getUserByGoogleId);
            }

            const imgUrl = profile.photos[0].value;
            const biggerImg = imgUrl.slice(0, -2).concat('300');

            const email = profile.emails[0].value;

            result = await makeQuery(
                getUserByEmailQuery,
                getUserByEmailVariable(email)
            );

            const existingLocalUser =
                result && result.data && result.data.getUserByEmail;

            if (existingLocalUser) {
                result = await makeMutation(
                    updateUserQuery,
                    updateUserVariable(existingLocalUser.id, profile.id)
                );

                return done(null, result.data.updateUser);
            }
            // Create a brand new user.
            result = await makeMutation(
                createGoogleUserQuery,
                createGoogleUserVariable(
                    profile.name.givenName,
                    profile.name.familyName,
                    profile.id,
                    email,
                    biggerImg
                )
            );

            const createGoogleUser =
                result && result.data && result.data.createGoogleUser;

            delete createGoogleUser.password;

            return done(null, createGoogleUser);
        }
    )
);

passport.use(
    'local-signup',
    new LocalStrategy(
        {
            passReqToCallback: true,
            usernameField: 'email',
            passwordField: 'password',
        },
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
                if (err)
                    return done(null, false, {
                        message:
                            'There was an error creating your account, please try again.',
                    });

                bcrypt.hash(password, salt, async (hashErr, hashedPassword) => {
                    if (hashErr)
                        return done(null, false, {
                            message:
                                'There was an error creating your account, please try again.',
                        });

                    const createUserResult = await makeMutation(
                        createLocalUserQuery,
                        createLocalUserVariable(
                            req.body.firstName,
                            req.body.middleName,
                            req.body.lastName,
                            hashedPassword,
                            username
                        )
                    );

                    const newLocalUser =
                        createUserResult &&
                        createUserResult.data &&
                        createUserResult.data.createLocalUser;

                    delete newLocalUser.password;

                    done(null, newLocalUser);
                });
            });
        }
    )
);

passport.use(
    'local-login',
    new LocalStrategy(
        {
            passReqToCallback: true,
            usernameField: 'email',
            passwordField: 'password',
        },
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
                        'Your account is connected to a Google account. Please use the `Login with Google` button to continue.',
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

            delete getUserByEmail.password;

            done(null, getUserByEmail);
        }
    )
);
