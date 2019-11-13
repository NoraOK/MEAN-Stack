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
app.use(express.static(__dirname+'/static'));
app.set('view engine', 'ejs');
app.set('views',__dirname+"/views");
app.use(express.urlencoded({extend:true}));

var bcrypt = require('bcryptjs')

mongoose.connect('mongodb://localhost/users_login', {useNewParser: true });

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true,},
    first_name: { type: String, required: true,},
    last_name: { type: String, required: true,},
    birthday: { type: String, required: true,},
    password_hash: { type: String, required: true,},
},{timestamps: true});

const User = mongoose.model('User', UserSchema);

app.get('/', (req, res)=>{
    res.render('index')
})

app.post('/register',(req, res)=>{
    var error = false;
    if (!(req.body.email.includes('@') && req.body.email.includes('.'))){
        req.flash('reg', 'Not an email!')
        error = true;
    }
    if(!(req.body.first_name.length>1)){
        req.flash('reg', 'Please add more than one character')
        error = true;
    }
    if(!(req.body.last_name.length>1)){
        req.flash('reg', 'Please add more than one character')
        error = true;
    }
    if(!(req.body.password.length>5)){
        req.flash('reg', 'Please add more than five character')
        error = true;
    }
    if(req.body.password != res.body.cpassword){
        req.flash('reg', 'Please add more than five character')
        error = true;
    }
    var re= /[0-9]/;
    if(!re.test(req.body.password)){
        req.flash('reg', 'Please include atleast one number')
        error = true;
    }
    if (error){
        res.redirect('/')
    }else{
        //Hash password (asynchronously)
        bcrypt.hash(req.body.password, 8)
            .then((hash)=>{
                req.body.password_hash = hash;
                delete req.body.password;
                delete req.body.cpassword;
                //create the user
                return User.create(req.body);
            })
            .then((user)=> {
                req.flash('reg',"User created!" + user.email);
                res.redirect('/');
            })
            .catch((err) => {
                for (var key in err.errors){
                    req.flash(key,errors[key].message);
                }
                res.redirect('/')
            });

    }

})

app.post('/login',(req, res)=>{
    User.findOne({email: req.body.email})
        .then((user)=>{
            return bcrypt.compare(req.body.password, user.password_hash);
        })
        .then((result)=>{
            //'result' here is whether the password was correct or not
            if(result){
                res.redirect('/success')
            }else{
                req.flash('reg', 'Wrong password');
                res.redirect('/')
            }
        })
        .catch((err)=>{
            for(var key in err.errors){
                req.flash('reg', err.errors[key].message);
            }
            req.flash('reg', 'Error finding user account');
            res.redirect('/')
        })
})

app.get('/success', (req, res)=>{
    res.end('Success')
})


app.listen(8000,()=> console.log("listening on port 8000 <3"));

