// External Packages
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");

// Local Packages
const keys = require("../client/src/config/keys");

// Load models
const User = mongoose.model("users");

// Define passport functions
passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.findById(id).then(user => {
		done(null, user);
	});
});

passport.use(
	new GoogleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: "/auth/google/callback",
			proxy: true
		},

		async (accessToken, refreshToken, profile, done) => {
			const existingUser = await User.findOne({ googleId: profile.id });

			if (existingUser) {
				return done(null, existingUser);
			}

			const imgUrl = profile.photos[0].value
			const biggerImg = imgUrl.slice(0, -2).concat('300');

			const newUser = await new User({
				googleId: profile.id,
				name: profile.displayName,
				img: biggerImg
			}).save();

			done(null, newUser);
		}
	)
);
