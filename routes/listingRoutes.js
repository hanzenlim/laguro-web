const mongoose = require("mongoose");
const Listing = mongoose.model("listing");

module.exports = app => {
	//get all listings route
	app.get("/api/listings", async (req, res) => {
		const allListings = await Listing.find();

		res.send(allListings);
	});
};
