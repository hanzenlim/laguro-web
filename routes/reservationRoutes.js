const mongoose = require("mongoose");
const Reservation = mongoose.model("reservation");
const Listing = mongoose.model("listing");

module.exports = app => {
  //reservation creation route
  app.post("/api/reservations", async (req, res) => {
    const reserved_by = req.user._id;
    const {
      listing_id,
    	office_name,
    	office_img,
    	chairs_selected,
    	appointments,
    	staff_selected,
    	total_paid,
    	time_start,
    	time_end
    } = req.body;

    let newReservation = await Reservation.create({
      listing_id,
      reserved_by,
    	office_name,
    	office_img,
    	chairs_selected,
    	appointments,
    	staff_selected,
    	total_paid,
    	time_start,
    	time_end
    });

    let updatedListing = await Listing.findOneAndUpdate(
      { _id: listing_id },
      { reservation_id: newReservation._id, reserved_by },
      { new: true }
    );

    res.send(updatedListing);
  });

  //get user offices route
  app.get("/api/user/reservations", async (req, res) => {
    const user_reservations = await Reservation.find({reserved_by: req.user._id});

    res.send(user_reservations);
  });
};
