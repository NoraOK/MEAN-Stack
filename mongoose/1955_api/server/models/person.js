const mongoose = require('mongoose');

const PersonSchema = new mongoose.Schema({
    name: {
        type: String,
        // required: [true, "Why no name?"]
    },

}, { timestamps: true })


const Person = mongoose.model('Person', PersonSchema);