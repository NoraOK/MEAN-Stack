const mongoose = require('mongoose')
    Person = mongoose.model('Person');
    const people =require('../controllers/people.js')
module.exports = (app) => {

    app.get('/', people.index)

    app.get('/new/:name', people.newPerson)

    app.get('/delete/:name', people.deletePerson)

    app.get('/:name', people.onePerson)

}