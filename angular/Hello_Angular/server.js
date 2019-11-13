const express = require('express');
const app = express();
const mongoose = require('mongoose');
const flash = require('express-flash');
const session = require('express-session');
app.use(session({
    secret: 'candycane',
    resave: false,
    saveUnintialized: true,
    cookie: { maxage: 60000 }
}))
app.use(flash());
app.listen(8000, () => console.log("listening on port 8000 <3"));
// app.use(express.static(__dirname + '/client/static'));
// app.set('view engine', 'ejs');
// app.set('views', __dirname + "/client/views");
app.use(express.urlencoded({extended: true}));

// app.use(express.json());

require('./server/config/mongoose.js')
require('./server/models/task.js')
require('./server/config/routes.js')(app)

app.use(express.static( __dirname + '/public/dist/public' ));
