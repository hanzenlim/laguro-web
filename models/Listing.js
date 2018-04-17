const mongoose = require("mongoose");
const { Schema } = mongoose;

const listingSchema = new Schema({
	office: { type: Schema.Types.ObjectId },
	host: String,
	reservation_id: String,
	staff: [{
		role: String,
		price: Number,
		count: Number
	}],
	equipment: [{
		name: String,
		price: Number
	}],
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
