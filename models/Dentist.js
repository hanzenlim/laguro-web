const mongoose = require("mongoose");
const { Schema } = mongoose;

const dentistSchema = new Schema({
	user_id: String,
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
// 	badges:[
// 		"Newsletters",
// 		"Surgery",
// 		"At Risk Patients"
// 	],
// 	rating:[4,4,3,4,5]
// })
