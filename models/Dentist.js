const mongoose = require("mongoose");
const { Schema } = mongoose;

const dentistSchema = new Schema({
	user_id: String,
	name: String,
	type: String,
	location: String,
	badges: [String],
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
// 	]
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
// 	]
// })
