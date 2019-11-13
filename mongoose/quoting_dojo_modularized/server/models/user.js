const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Why no name?"]
    },
    quote: {
        type: String,
        required: [true, "Why no quote?"]
    }
}, { timestamps: true })


const User = mongoose.model('User', UserSchema);

