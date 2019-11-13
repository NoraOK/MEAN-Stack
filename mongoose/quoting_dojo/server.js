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
app.use(express.static(__dirname + '/static'));
app.set('view engine', 'ejs');
app.set('views', __dirname + "/views");
app.use(express.urlencoded({ extend: true }));

mongoose.connect('mongodb://localhost/users', { useNewUrlParser: true });
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Why no name?"]
    },
    quote: {
        type: String,
        required: [true, "Why no quote?"]
    }
}, { timestamps: true })

const User = mongoose.model('User', UserSchema);

app.get('/', (req, res) => { //renders the index page
    res.render('index')
});

app.get('/quotes', (req, res) => { //renders the quote page
    User.find().sort('-createdAt')
        .then(users => {
            var context = { users: users };
            res.render('quotes', context)

        })
        .catch(err => res.json(err))
});

app.post('/quotes', (req, res) => {
    const userData = req.body;
    User.create(userData)
        .then(newUser => {
            console.log("User created: ", userData);
            res.redirect('/quotes')
        })
        .catch(err => {
            console.log("We have an error", err);
            for (var key in err.errors) {
                req.flash(key, err.errors[key].message);
            }
            res.redirect('/')
        })
})

app.get('/clear', (req, res) => {
    User.remove()
        .then(deletedUsers => {
            res.redirect('/')
        })
        .catch(err => res.json(err));
})

app.get('/back', (req, res) => {
    res.redirect('/')
})

app.get('/skip', (req, res) => {
    res.redirect('/quotes')
})
