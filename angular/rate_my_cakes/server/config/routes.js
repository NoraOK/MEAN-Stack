const mongoose = require('mongoose')
    Cake = mongoose.model('Cake');
    const cakes =require('../controller/cakes.js')
module.exports = (app) => {

    app.get('/cakes', cakes.index)

    app.get('/cakes/:id', cakes.findCake)

    app.post('/cakes/new', cakes.new)

    app.put('/cakes/update/:id', cakes.updateCake)

    app.delete('/cakes/delete/:id', cakes.deleteCake)

}