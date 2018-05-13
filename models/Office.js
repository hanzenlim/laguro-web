const mongoose = require('mongoose');

const { Schema } = mongoose;
const officeSchema = new Schema({
    user: String,
    name: String,
    location: String,
    img_url: [String],
    chairs: Number,
    equipment: [{
        name: String,
        price: Number,
    }],
    date_created: {
        type: Date,
        default: Date.now,
    },
});

mongoose.model('office', officeSchema);
