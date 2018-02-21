const mongoose = require("mongoose");
const listingSchema = require("./Listing");
const { Schema } = mongoose;

const officeSchema = new Schema({
	name: String,
	location: String,
	chairs: Number,
	rating: [Number],
	listings: [listingSchema],
	date_created: {
		type: Date,
		default: Date.now
	}
});

const Office = mongoose.model("office", officeSchema);

// const bell = new Office({
// 	name:"Bell Dental Center",
// 	location:"San Leandro, CA",
// 	chairs: 7,
// 	listings: [],
// 	rating: [5,5,4,5,5,5,4,5]
// });
//
// bell.listings.push({
// 	staff: [
// 		{
// 			role: "RDA",
// 			price: 30,
// 			num_available: 3
// 		},
// 		{
// 			role: "DA",
// 			price: 17,
// 			num_available: 2
// 		}
// 	],
// 	equipment: [
// 		{
// 			name: "Sterilization",
// 			price: 10
// 		},
// 		{
// 			name: "Filling Setup",
// 			price: 20
// 		}
// 	],
// 	cleaning_fee: 50,
// 	time_available: ["8", "9"],
// 	price: 100
// })
//
// bell.save();
//
// const albright = Office.create({
// 	name:"Albright Dental",
// 	location:"Oakland, CA",
// 	chairs: 3,
// 	rating: [4,4,3,4,5]
// });
//
// const baysmile = Office.create({
// 	name:"Baysmile Dental",
// 	location:"Newark, CA",
// 	chairs: 4,
// 	rating: [4,4,3,4,4]
// });
