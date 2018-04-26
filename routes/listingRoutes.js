const mongoose = require("mongoose");
const Listing = mongoose.model("listing");
const Reservation = mongoose.model("reservation");

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
    const {
      office,
      office_name,
      office_img,
      office_chairs,
      price,
      staff,
      equipment,
      chairs_available,
      time_available,
      time_closed,
      cleaning_fee
    } = req.body;
    const host = req.user._id;

    let newListing = await Listing.create({
      office,
      office_name,
      office_img,
      office_chairs,
      host,
      staff,
      equipment,
      chairs_available,
      cleaning_fee,
      time_available,
      time_closed,
      price
    });

    res.send(newListing);
  });

  //edit listing route
  app.patch("/api/listings", async (req, res) => {
    await Listing.findOneAndUpdate(
      { _id: req.body.id },
      { ...req.body },
      { new: true }
    );

    const listings = await Listing.find();

    res.send(listings);
  });

  //delete listing route
  app.delete("/api/listings/:id", async (req, res) => {
    const listing = await Listing.findOne({ _id: `${req.params.id}` });

    await Reservation.find({ listing_id: listing._id }).remove();

    await Listing.find({ _id: req.params.id }).remove();
    const listings = await Listing.find();

    res.send(listings);
  });
};
