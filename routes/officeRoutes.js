const mongoose = require("mongoose");
const Office = mongoose.model("office");
const Listing = mongoose.model("listing");

module.exports = app => {
	//get all offices route
	app.get("/api/offices", async (req, res) => {
		const allOffices = await Office.find();

		res.send(allOffices);
	});

	//get user offices route
	app.get("/api/user/offices", async (req, res) => {
		const userOffices = await Office.find({dentist: req.user._id});

		res.send(userOffices);
	});

	//get one office route
	app.get("/api/offices/:id", async (req, res) => {
		const office = await Office.find({ _id: `${req.params.id}` });

		res.send(office);
	});

	//get all listings for an office
	app.get("/api/offices/:id/listings", async (req, res) => {
		await Listing.find({ office: `${req.params.id}` }).exec((err, listings) => {
			if (err) res.send(err);
			res.send(listings);
		});
	});

	//Office creation route
	app.post("/api/offices", async (req, res) => {
		const { name, location, chairs } = req.body;
		const dentist_id = req.user._id;

		let newOffice = await Office.create({
			name,
			location,
			chairs,
			dentist: dentist_id
		});

		let dentistsOffices = await Office.find({ dentist: req.user.googleId });
		res.send(dentistsOffices);
	});
};
