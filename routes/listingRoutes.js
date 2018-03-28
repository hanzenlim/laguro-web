const mongoose = require("mongoose");
const Listing = mongoose.model("listing");

module.exports = app => {
	//get all listings route
	app.get("/api/listings", async (req, res) => {
		const allListings = await Listing.find();

		res.send(allListings);
	});

	//get single listings route
	app.get("/api/listings/:id", async (req, res) => {
		const listing = await Listing.findOne({ _id: `${req.params.id}` });

		res.send(listing);
	});

	//Listing creation route
	app.post("/api/listings", async (req, res) => {
		const { office, price, staff, equipment, time_available, time_closed, cleaning_fee } = req.body;
		const user = req.user._id;

		let newListing = await Listing.create({
			office,
			user,
			staff,
			equipment,
			cleaning_fee,
			time_available,
			time_closed,
			price
		});

		res.send(newListing);
	});

	//edit office route
	app.patch("/api/listings", async (req, res) => {
		const { staff, equipment, cleaning_fee, time_available, time_closed, price, id } = req.body;

		await Listing.findOneAndUpdate(
			{ _id : id },
			{
				staff,
				equipment,
				cleaning_fee,
				time_available,
				time_closed,
				price
			},
			{ new: true }
		);

		const listings = await Listing.find();

		res.send(listings);
	});

	//delete listing route
	app.delete("/api/listings/:id", async (req, res) => {

		await Listing.find({_id: req.params.id}).remove();

		const listings = await Listing.find();

		res.send(listings);
	});
};
