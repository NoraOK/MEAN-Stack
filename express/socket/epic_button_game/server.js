const express = require('express');
const app = express();
app.use(express.static(__dirname + '/static'));
app.set('view engine', 'ejs');
app.set('views', __dirname +'/views');
app.use(express.urlencoded({extended:true}));
const server = app.listen(8000, () => console.log('listening on port 8000 <3'));
const io = require('socket.io')(server);
var count = 0

app.get('/', (req,res) =>{
    res.render('index')
});

io.on("connection", function(socket){
    console.log('connection is running');
    socket.emit('send_count', count);
    socket.on('pushing_button', function(data){
        count += data;
        io.emit('send_count', count);
    })
    socket.on('pushing_reset', function(new_count){
        count = new_count;
        io.emit('send_count', count)
    })
})