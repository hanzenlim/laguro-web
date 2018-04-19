const mongoose = require("mongoose");
const Reservation = mongoose.model("reservation");
const Listing = mongoose.model("listing");

module.exports = app => {
  //reservation creation route
  app.post("/api/reservations", async (req, res) => {
    const reserved_by = req.user._id;
    const {
      listing_id,
      office_id,
      host_id,
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
      office_id,
      host_id,
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

  //delete reservation route
  app.delete("/api/reservations/:id", async (req, res) => {
    let reservation = await Reservation.findOne({_id: req.params.id});
    let reserved_by = reservation.reserved_by;
    let listing_id = reservation.listing_id;

    await Reservation.find({_id: req.params.id}).remove();
    const user_reservations = await Reservation.find({
      reserved_by: reserved_by
    });

    await Listing.findOneAndUpdate(
      { _id: listing_id },
      {
        reservation_id: undefined,
        reserved_by: undefined
      },
      { new: true }
    );

    res.send(user_reservations);
  });
};
