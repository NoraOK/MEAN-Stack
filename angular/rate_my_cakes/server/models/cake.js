const mongoose = require('mongoose');

const CakeSchema = new mongoose.Schema({
    baker: {type: String, default: ""},
    image: {type: String, contentType: String},
    avgRating: {type: Number, default: 0},
    ratings: [{
        comment: {type: String, default: ""},
        rating: {type: Number, default: 0},
    }]
},{ timestamps: true })


const Cake = mongoose.model('Cake', CakeSchema);