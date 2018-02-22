const mongoose = require("mongoose");
const { Schema } = mongoose;

const listingSchema = new Schema({
	office: { type: Schema.Types.ObjectId },
	staff: [{
		role: String,
		price: Number,
		num_available: Number
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
