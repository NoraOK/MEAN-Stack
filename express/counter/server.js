const express = require('express');
const app = express();
const session = require('express-session');
app.use(session({
    secret:'candycane',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 60000}
}))

app.use(express.static(__dirname + '/static'));
app.set('view engine', 'ejs');
app.set('views', __dirname +'/views');

app.get('/',function(req, res, next){ //what does the next do and why doesnt the arrow work?
    if (req.session.views) {
      req.session.views++;
    }else{
      req.session.views = 1; //why doest it work when i set it to 0?
    }
    res.render('index', {count : req.session.views});
});

app.get('/add_two', (req, res) =>{
    req.session.views += 1;
    res.redirect('/');
})

app.get('/reset', (req, res) =>{
    req.session.destroy(function(err) {
    })
    res.redirect('/');
})


// app.get('/', (req,res) => {
//     console.log('Value of count in session:', req.session.count);
//     res.render('index', {count: 0});
// });

// app.get('/count', (req,res) => {
//     if (req.session.count = req.body.count){
//         count += 1;
//     }
//     else{
//         count +=1
//     }
//     res.redirect('/');
// });

app.listen(8000, () => console.log('listening on port 8000 <3'))