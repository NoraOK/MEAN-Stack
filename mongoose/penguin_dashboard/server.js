const express = require('express');
const app = express();
const mongoose = require('mongoose');
const flash = require('express-flash');
const session = require('express-session');
app.use(session({
    secret: 'candycane',
    resave: false,
    saveUnintialized: true,
    cookie: {maxage: 60000}
}))
app.use(flash());
app.listen(8000,()=> console.log("listening on port 8000 <3"));
app.use(express.static(__dirname+'/static'));
app.set('view engine', 'ejs');
app.set('views',__dirname+"/views");
app.use(express.urlencoded({extend:true}));

mongoose.connect('mongodb://localhost/penguins', {useNewUrlParser: true});
const PenguinSchema = new mongoose.Schema({
    name: String,
    age: Number,
    fav_movie: String,
    fav_food: String
},{timestamps: true})

const Penguin = mongoose.model('Penguin', PenguinSchema);

app.get('/',(req,res)=>{
    Penguin.find().sort('-createdAt')
        .then(data => {
            var context = {penguins: data};
            res.render('index', context)
        })
        .catch(err => res.json(err))
})

app.get('/new', (req,res)=>{
    res.render('new')
})

app.post('/add_new', (req,res)=>{
    const penguinData = req.body;
    Penguin.create(penguinData)
        .then(newPen => {
            res.redirect('/')
        })
        .catch(err => res.json(err));
})


app.get('/details/:id', (req, res)=>{
    const { id } = req.params;
    Penguin.findOne({_id:id})
        .then(data => {
            var context = {penguin: data};
            res.render('details', context)
        })
        .catch(err => res.json(err))
})

app.get('/edit/:id', (req, res)=>{
    const { id } = req.params;
    Penguin.findOne({_id:id})
    .then(data => {
        var context = {penguin: data};
        
        res.render('edit', context)
    })
    .catch(err => res.json(err))
})

app.post('/edit/:id', (req, res)=>{
    const { id } = req.params;
    const penguinData = req.body;
    Penguin.updateOne({_id:id},{name: penguinData.name, age: penguinData.age, fav_movie: penguinData.fav_movie, fav_food: penguinData.fav_food})
        .then(data => {
            res.redirect('/details/'+id)
        })
        .catch(err => res.json(err))
})

app.get('/delete/:id', (req, res)=>{
    const { id } = req.params;
    Penguin.remove({_id:id})
        .then(deletedUser => {
            res.redirect("/")
        })
        .catch(err => res.json(err))
})



