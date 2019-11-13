const mongoose = require('mongoose')
    User = mongoose.model('User');
    const users =require('../controllers/users.js')
module.exports = (app) => {

    app.get('/', (req, res) => { //renders the index page
        users.index(req,res);
    });

    app.get('/quotes',(req, res) => { //renders the quote page
        users.quotes(req, res);
    });

    app.post('/quotes', (req, res) => {
        users.create_quotes(req, res);
    });

    app.get('/clear', (req, res) => {
        users.clear(req, res);
    });

    app.get('/back', (req, res) => {
        users.back(req,res);
    })

    app.get('/skip', (req, res) => {
        users.skip(req,res);
    })

}
