const mongoose = require("mongoose");
const { Schema } = mongoose;

const reviewSchema = new Schema({
	reviewer_id: String,
	reviewer_img: String,
	reviewer_name: String,
	reviewee_id: String,
	rating: Number,
	text: String,
	date_created: {
		type: Date,
		default: Date.now
	}
});

const Review = mongoose.model("review", reviewSchema);
