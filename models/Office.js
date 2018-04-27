const mongoose = require("mongoose");
const Listing = mongoose.model("listing");
const { Schema } = mongoose;

const officeSchema = new Schema({
	user: String,
	name: String,
	location: String,
	img_url: [String],
	chairs: Number,
	equipment: [{
		name: String,
		price: Number
	}],
	date_created: {
		type: Date,
		default: Date.now
	}
});

const Office = mongoose.model("office", officeSchema);
