const mongoose = require('mongoose')
    Task = mongoose.model('Task');
    const tasks =require('../controllers/tasks.js')
module.exports = (app) => {

    app.get('/', tasks.index)

    app.get('/:id', tasks.findTask)

    app.post('/new', tasks.new)

    app.put('/update/:id', tasks.updateTask)

    app.delete('/delete/:id', tasks.deleteTask)

}