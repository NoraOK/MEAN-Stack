const express = require('express');
const app = express();
app.use(express.static(__dirname + '/static'));
app.set('view engine', 'ejs');
app.set('views', __dirname +'/views');
app.use(express.urlencoded({extended:true}));
const server = app.listen(8000, () => console.log('listening on port 8000 <3'));
const io = require('socket.io')(server);
var counter = 0;
    

app.get('/', (req,res) =>{
    res.render('index')
});

io.on('connection', function (socket) { //2
    console.log('connection is running');
    socket.on('posting_form', function(msg){
      console.log('test');
      console.log('posting_form: ' + msg.name+", "+msg.location); //8 (note: this log will be on your server's terminal)
      msg.randnum = Math.floor((Math.random()*999) + 1);
      console.log(msg.randnum)
      socket.emit('updated_message', msg)
    });

});

// app.post('/results', (req,res)=>{
//     console.log('Got the post form!')
//     var name = req.body.name;
//     var location = req.body.location;
//     var language = req.body.language;
//     var comment = req.body.comment;

//     res.render('results',{name: name, location: location, language: language, comment: comment})
// });



