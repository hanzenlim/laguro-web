const mongoose = require("mongoose");
const Listing = mongoose.model("listing");
const { Schema } = mongoose;

const officeSchema = new Schema({
	dentist: { type: Schema.Types.ObjectId },
	name: String,
	location: String,
	img_url: String,
	chairs: Number,
	rating: [Number],
	date_created: {
		type: Date,
		default: Date.now
	}
});

const Office = mongoose.model("office", officeSchema);

// const bell = new Office({
// 	name: "Bell Dental Center",
// 	location: "San Leandro, CA",
// 	chairs: 7,
// 	rating: [5, 5, 4, 5, 5, 5, 4, 5],
// 	img_url: "/img/bell.jpg"
// });
//
// bell.save();
//
// Listing.create({
// 	office: bell._id,
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
// 	time_available: new Date('February 25, 2018 19:00:00'),
// 	time_closed: new Date('February 25, 2018 22:00:00'),
// 	price: 100
// });
//
// Listing.create({
// 	office: bell._id,
// 	staff: [
// 		{
// 			role: "Front Desk",
// 			price: 15,
// 			num_available: 1
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
// 	time_available: new Date('February 26, 2018 20:00:00'),
// 	time_closed: new Date('February 26, 2018 22:00:00'),
// 	price: 100
// });
//
// const albright = Office.create({
// 	name: "Albright Dental",
// 	location: "Oakland, CA",
// 	chairs: 3,
// 	rating: [4, 4, 3, 4, 5],
// 	img_url: "/img/albright.jpg"
// });
//
// const baysmile = Office.create({
// 	name: "Baysmile Dental",
// 	location: "Newark, CA",
// 	chairs: 4,
// 	rating: [4, 4, 3, 4, 4],
// 	img_url: "/img/baysmile.jpg"
// });
