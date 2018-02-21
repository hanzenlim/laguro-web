const mongoose = require("mongoose");
const { Schema } = mongoose;

const officeSchema = new Schema({
	name: String,
	location: String,
	chairs: Number,
	rating: [Number],
	date_created: {
		type: Date,
		default: Date.now
	}
});

const Office = mongoose.model("office", officeSchema);
// 
// Office.create({
// 	name:"Bell Dental Center",
// 	location:"San Leandro, CA",
// 	chairs: 7,
// 	rating: [5,5,4,5,5,5,4,5]
// });
//
// Office.create({
// 	name:"Albright Dental",
// 	location:"Oakland, CA",
// 	chairs: 3,
// 	rating: [4,4,3,4,5]
// });
//
// Office.create({
// 	name:"Baysmile Dental",
// 	location:"Newark, CA",
// 	chairs: 4,
// 	rating: [4,4,3,4,4]
// });
