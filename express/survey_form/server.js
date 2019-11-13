const express = require('express');
const app = express();
app.use(express.static(__dirname + '/static'));
app.set('view engine', 'ejs');
app.set('views', __dirname +'/views');
app.use(express.urlencoded({extended:true}));

app.get('/', (req,res) =>{
    res.render('index')
});

app.post('/results', (req,res)=>{
    console.log('Got the post form!')
    var name = req.body.name;
    var location = req.body.location;
    var language = req.body.language;
    var comment = req.body.comment;

    res.render('results',{name: name, location: location, language: language, comment: comment})
});



app.listen(8000, () => console.log('listening on port 8000 <3'));