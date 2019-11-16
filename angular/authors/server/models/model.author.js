const mongoose = require('mongoose');

const AuthorSchema = new mongoose.Schema({
    name: {type: String, default: ""},
},{ timestamps: true })

const Author = mongoose.model('Author', AuthorSchema);