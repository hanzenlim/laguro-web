const mongoose = require("mongoose");
const Reservation = mongoose.model("reservation");

module.exports = app => {
  //reservation creation route
  app.post("/api/reservations", async (req, res) => {
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
    const reserved_by = req.user._id;

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

    res.send(newReservation);
  });
};
