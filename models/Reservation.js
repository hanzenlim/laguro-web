const mongoose = require("mongoose");
const { Schema } = mongoose;

const reservationSchema = new Schema({
	listing_id: String,
	office_id: String,
	host_id: String,
	office_name: String,
	office_img: String,
	reserved_by: String,
	chairs_selected: Number,
	appointments:[{
		patient_id: String,
		time: Date
	}],
	staff_selected: [{
		role: String,
		price: Number,
		count: Number
	}],
	equip_selected: [{
		name: String,
		price: Number
	}],
	total_paid: Number,
	time_start: Date,
	time_end: Date,
	date_created: {
		type: Date,
		default: Date.now
	}
});

const Listing = mongoose.model("reservation", reservationSchema);
