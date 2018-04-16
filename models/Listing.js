const mongoose = require("mongoose");
const { Schema } = mongoose;

const listingSchema = new Schema({
	office: { type: Schema.Types.ObjectId },
	office_name: String,
	office_img: String,
	appts_per_hour: Number,
	host: String,
	reserved_by: String,
	staff: [{
		role: String,
		price: Number,
		count: Number
	}],
	staff_required: [{
		role: String,
		price: Number,
		count: Number
	}],
	equipment: [{
		name: String,
		price: Number
	}],
	total_paid: Number,
	cleaning_fee: Number,
	time_available: Date,
	time_closed: Date,
	price: Number,
	date_created: {
		type: Date,
		default: Date.now
	}
});

const Listing = mongoose.model("listing", listingSchema);
