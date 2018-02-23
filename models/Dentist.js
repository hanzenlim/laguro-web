const mongoose = require("mongoose");
const { Schema } = mongoose;

const dentistSchema = new Schema({
	user_id: String,
	img_url: String,
	name: String,
	type: String,
	location: String,
	badges: [String],
	rating: [Number],
	date_created: {
		type: Date,
		default: Date.now
	}
});

const Dentist = mongoose.model("dentist", dentistSchema);

// Dentist.create({
// 	name:"William Choi",
// 	type:"General Dentist",
// 	location:"San Leandro, CA",
// 	img_url: "/img/choi.jpg",
// 	badges:[
// 		"Root Canal",
// 		"Braces",
// 		"Implants"
// 	],
// 	rating:[4,5,3,4,5,5]
// });
//
// Dentist.create({
// 	name:"Dyani Gaudilliere",
// 	type:"Dental Researcher",
// 	location:"Palo Alto, CA",
// 	img_url: "/img/dyani.jpg",
// 	badges:[
// 		"Newsletters",
// 		"Surgery",
// 		"At Risk Patients"
// 	],
// 	rating:[4,4,3,4,5]
// })
