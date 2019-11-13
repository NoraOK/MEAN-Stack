const express = require('express');
const app = express();
const mongoose = require('mongoose');
app.use(express.static(__dirname + '/static'));
app.set('view engine', 'ejs');
app.set('views', __dirname +'/views');
app.use(express.urlencoded({extended:true}));

mongoose.connect('mongodb://localhost/hellomongoose',{useNewUrlParser:true});
const UserSchema = new mongoose.Schema({
    name: String,
    age: Number
})
const User = mongoose.model('User', UserSchema);

app.get('/', (req,res)=>{
    User.find()
        .then(data => res.render('index',{users: data}))
        .catch(err => res.json(err));
});

app.post('/users',(req,res)=>{
    console.log('got the post form');
    const user = new User();
    user.name = req.body.name;
    user.age = req.body.age;
    user.save()
        .then(newUserData => console.log("User created: ", newUserData))
        .catch(err => console.log(err));
    res.redirect('/');
});

app.listen(8000,()=> console.log("listening on port 8000 <3"))