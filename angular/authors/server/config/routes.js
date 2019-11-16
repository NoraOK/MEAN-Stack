const mongoose = require('mongoose')
    Author = mongoose.model('Author');
    const authors =require('../controller/controller.authors.js')
module.exports = (app) => {

    app.get('/authors_json', authors.index) //gets all authors

    app.get('/authors_json/:id', authors.findAuthor) //gets one author

    app.post('/authors_json/new', authors.new) //creates new author

    app.put('/authors_json/:id', authors.updateAuthor) //updates specific author

    app.delete('/authors_json/:id', authors.deleteAuthor) //deletes specific author

}