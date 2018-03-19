// External Packages
const passport = require("passport");
const mongoose = require("mongoose");
const User = mongoose.model("users");

module.exports = app => {
  // hit this route to start oauth process
	app.get(
		"/auth/google",
		passport.authenticate("google", {
			scope: ["profile", "email"]
		})
	);

  //hit by goog OAuth post-auth
	app.get(
		"/auth/google/callback",
		passport.authenticate("google"),
		(req, res) => {
			res.redirect('/profile');
		}
	);

  // visiting this route clears logged in user
	app.get('/api/logout', (req, res) => {
		req.logout();
		res.redirect('/');
	})

	//use this route to test which user is logged in (testing purposes)
	app.get("/api/current_user", (req, res) => {
		res.send(req.user);
	});

	//use this route to update the user profile image
	app.patch("/api/current_user/image", (req, res) => {
		User.findByIdAndUpdate(req.user._id, { $set: { img: req.body.url }}, { new: true }, (err, user) => {
			res.send(user);
		});
	})

	//returns a list of all users
	app.get("/api/users", async (req, res) => {
		const userList = await User.find();
		res.send(userList);
	});
};
