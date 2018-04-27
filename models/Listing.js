const mongoose = require("mongoose");
const { Schema } = mongoose;

const listingSchema = new Schema({
	office: { type: Schema.Types.ObjectId },
	office_img: String,
	office_name: String,
	office_chairs: Number,
	host: String,
	reservation_id: String,
	reserved_by: String,
	staff: [{
		role: String,
		price: Number,
		count: Number
	}],
	chairs_available: Number,
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
