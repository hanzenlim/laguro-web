const mongoose = require('mongoose');

const { Schema } = mongoose;

const dentistSchema = new Schema({
    user_id: String,
    img_url: String,
    name: String,
    specialty: String,
    location: String,
    procedures: [{
        name: String,
        duration: Number,
    }],
    date_created: {
        type: Date,
        default: Date.now,
    },
});

mongoose.model('dentist', dentistSchema);
