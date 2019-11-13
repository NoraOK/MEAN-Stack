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

const CommentSchema = new mongoose.Schema({
    comment_name: {
        type: String, 
        required: [true, " You must enter a name!"]
    },
    comment_content: {
        type: String,
        required:[true, "You must enter a comment!"]
    },
},{timestamps: true})

const MessageSchema = new mongoose.Schema({
    msg_name: {
        type: String,
        required: [true, "You must enter a name!"]
    },
    msg_content: {
        type: String,
        required: [true, "You must enter a message!"]
    },
    comments: [CommentSchema]
},{timestamps: true})

const Comment = mongoose.model('Comment', CommentSchema);
const Message = mongoose.model('Message', MessageSchema);

app.get('/',(req,res)=>{
    Message.find().sort('-createdAt')
    .then(data => {
        var context = {msgs: data};
        res.render('index', context)
    })
    .catch(err => res.json(err))
})

app.post('/post_message', (req, res) =>{
    const messageData = req.body;
    Message.create(messageData)
        .then(data => {
            res.redirect('/')
        })
        .catch(err => {
            // console.log("We have an error", err);
            for (var key in err.errors) {
                console.log(err.errors[key].message)
                req.flash(key, err.errors[key].message);
            }
            res.redirect('/')
})

app.post('/post_comment/:id',(req, res)=>{
    const commentData = req.body;
    const { id } =req.params
    Comment.create(req.body, function(err,data){
        if(err){
            for (var key in err.errors) {
                req.flash(key, err.errors[key].message);
            }
            res.redirect('/')
        }
        else{
            Message.findOneAndUpdate({_id: id}, {$push:{comments: data}}, function(err,data){
                if(err){
                    res.redirect('/')
                }else{
                    res.redirect('/')
                }
            })
        }
    })
})

app.get ('/delete/:id', (req, res)=>{
    const { id } = req.params
    Message.remove({_id:id})
        .then(deletedMessage => {
            res.redirect("/")
        })
        .catch(err => res.json(err))
    })
})

