const mongoose = require('mongoose')
    Task = mongoose.model('Task');
    const tasks =require('../controllers/tasks.js')
module.exports = (app) => {

    app.get('/tasks', tasks.index)

    app.get('/tasks/:id', tasks.findTask)

    app.post('/tasks/new', tasks.new)

    app.put('/tasks/update/:id', tasks.updateTask)

    app.delete('/tasks/delete/:id', tasks.deleteTask)

}