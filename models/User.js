const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
    googleId: String,
    name: String,
    img: String,
    date_created: {
        type: Date,
        default: Date.now,
    },
});

mongoose.model('users', userSchema);
