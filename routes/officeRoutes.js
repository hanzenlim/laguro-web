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
		const userOffices = await Office.find({user: req.user._id});

		res.send(userOffices);
	});

	//get one office route
	app.get("/api/offices/:id", async (req, res) => {
		const office = await Office.findOne({ _id: `${req.params.id}` });

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
		const { name, location, chairs, img_url } = req.body;
		const user = req.user._id;

		let newOffice = await Office.create({
			name,
			location,
			chairs,
			img_url,
			user
		});

		let dentistsOffices = await Office.find({ dentist: req.user.googleId });
		res.send(dentistsOffices);
	});

	//edit office route
	app.patch("/api/offices", async (req, res) => {
		const { name, img_url, chairs, location, id } = req.body;

		let office = await Office.findOneAndUpdate(
			{ _id : id },
			{
				name,
				location,
				chairs,
				img_url
			},
			{ new: true }
		);

		const offices = await Office.find();

		res.send(offices);
	});

	//delete office route
	app.delete("/api/offices/:id", async (req, res) => {

		await Listing.find({office: req.params.id}).remove();
		await Office.find({_id: req.params.id}).remove();

		const offices = await Office.find();

		res.send(offices);
	});
};
