const mongoose = require("mongoose");
const Reservation = mongoose.model("reservation");

module.exports = app => {
  //reservation creation route
  app.post("/api/reservations", async (req, res) => {
    const {
      listing_id,
    	office_name,
    	office_img,
    	reserved_by,
    	chairs_selected,
    	appointments,
    	staff_selected,
    	total_paid,
    	time_start,
    	time_end
    } = req.body;
    const host = req.user._id;

    let newReservation = await Reservation.create({
      office,
      office_name,
      office_img,
      appts_per_hour,
      host,
      staff,
      equipment,
      cleaning_fee,
      time_available,
      time_closed,
      price
    });

    res.send(newReservation);
  });
};
