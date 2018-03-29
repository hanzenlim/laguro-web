const mongoose = require("mongoose");
const Dentist = mongoose.model("dentist");

module.exports = app => {
	//get all dentists route
	app.get("/api/dentists", async (req, res) => {
		const allDentists = await Dentist.find();

		res.send(allDentists);
	});

	//create dentist route
	app.post("/api/dentists", async (req, res) => {
		const { specialty, location, procedures } = req.body;
		const user = req.user;

		let newDentist = await Dentist.create({
			specialty,
			location,
			procedures,
			user_id: user._id,
			img_url: user.img,
			name: user.name,
			rating: []
		});

		res.send(newDentist);
	});

	//edit dentist route
	app.patch("/api/dentists", async (req, res) => {
		const { name, img_url, specialty, location, procedures, id } = req.body;

		let dentist = await Dentist.findOneAndUpdate(
			{ user_id: id },
			{
				specialty,
				location,
				procedures,
				name,
				img_url
			},
			{ new: true }
		);

		const dentists = await Dentist.find();

		res.send(dentists);
	});
};
