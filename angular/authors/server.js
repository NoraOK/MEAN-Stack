const express = require('express');
const app = express();
const mongoose = require('mongoose');
const flash = require('express-flash');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path')

app.use(flash());
// app.use(express.static(__dirname + '/client/static'));
app.set('view engine', 'ejs');
app.set('views', __dirname + "/client/views");
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json())

require('./server/config/mongoose.js')
require('./server/models/model.author.js')
require('./server/config/routes.js')(app)

app.use(express.static( __dirname + '/public/dist/public' ));

mongoose.connect('mongodb://localhost/authors', { useNewUrlParser: true });


// this route will be triggered if any of the routes above did not match
app.all("*", (req,res,next) => {
  res.sendFile(path.resolve("./public/dist/public/index.html"))
});


app.listen(8000, () => console.log("listening on port 8000 <3"));