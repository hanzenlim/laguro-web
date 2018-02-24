const mongoose = require("mongoose");
const Listing = mongoose.model("listing");

module.exports = app => {
	//get all listings route
	app.get("/api/listings", async (req, res) => {
		const allListings = await Listing.find();

		res.send(allListings);
	});
	//Listing creation route
	app.post("/api/listings", async (req, res) => {
		const { office, price, staff, equipment, time_available, time_closed, cleaning_fee } = req.body;
		const dentist = req.user._id;

		let newListing = await Listing.create({
			office,
			dentist,
			staff,
			equipment,
			cleaning_fee,
			time_available,
			time_closed,
			price
		});

		res.send(newListing);
	});
};
