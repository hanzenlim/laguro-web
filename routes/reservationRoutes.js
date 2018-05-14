const mongoose = require('mongoose');

const Reservation = mongoose.model('reservation');
const Listing = mongoose.model('listing');

module.exports = (app) => {
    // reservation creation route
    app.post('/api/reservations', async (req, res) => {
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
            equip_selected,
            total_paid,
            time_start,
            time_end,
        } = req.body;

        const newReservation = await Reservation.create({
            listing_id,
            office_id,
            host_id,
            reserved_by,
            office_name,
            office_img,
            chairs_selected,
            appointments,
            staff_selected,
            equip_selected,
            total_paid,
            time_start,
            time_end,
        });

        const updatedListing = await Listing.findOneAndUpdate(
            { _id: listing_id },
            { reservation_id: newReservation._id, reserved_by },
            { new: true },
        );

        res.send(updatedListing);
    });

    // get user reservations route
    app.get('/api/reservations/user', async (req, res) => {
        const user_reservations = await Reservation.find({
            reserved_by: req.user._id,
        });

        res.send(user_reservations);
    });

    // get dentist reservations route
    app.get('/api/reservations/dentist/:dentist_id', async (req, res) => {
        const dentist_reservations = await Reservation.find({
            reserved_by: req.params.dentist_id,
        });

        res.send(dentist_reservations);
    });

    // reserve an appt within reservation
    app.patch('/api/reservations/:res_id/appointments', async (req, res) => {
        const appt_id = req.body.appt_id;
        const reservation_id = req.params.res_id;
        const patient_id = req.body.patient_id;

        const reservation = await Reservation.findOne({ _id: reservation_id });

        const appointment = reservation.appointments.id(appt_id);

        appointment.patient_id = patient_id;

        await reservation.save();

        const user_reservations = await Reservation.find({
            reserved_by: reservation.reserved_by,
        });

        res.send(user_reservations);
    });

    // delete reservation route
    app.delete('/api/reservations/:id', async (req, res) => {
        const reservation = await Reservation.findOne({ _id: req.params.id });
        const reserved_by = reservation.reserved_by;
        const listing_id = reservation.listing_id;

        await Reservation.find({ _id: req.params.id }).remove();
        const user_reservations = await Reservation.find({
            reserved_by,
        });

        await Listing.findOneAndUpdate(
            { _id: listing_id },
            {
                reservation_id: undefined,
                reserved_by: undefined,
            },
            { new: true },
        );

        res.send(user_reservations);
    });
};
