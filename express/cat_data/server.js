const express = require('express');
const app = express();

app.use(express.static(__dirname + "/static"));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.get('/cats', (req,res)=>{
    res.render('cats');
})

app.get('/cats/toulouse', (req, res)=>{
    var cats_array = [
        {name: "Toulouse", fav_food: "tuna", sleep_spots: ["the foot of the bed","the couch", "a tree"]},
        {name: "Holly & Molly", fav_food: "salmon", sleep_spots: ["the attic","the couch", "under the kitchen table"]},
        {name: "Calvin", fav_food: "cheese", sleep_spots: ["the closet","the couch", "the bathtub"]}
    ]
    res.render('toulouse',{cats:cats_array});
})

app.get('/cats/molly&holly', (req, res)=>{
    var cats_array = [
        {name: "Toulouse", fav_food: "tuna", sleep_spots: ["the foot of the bed","the couch", "a tree"]},
        {name: "Holly & Molly", fav_food: "salmon", sleep_spots: ["the attic","the couch", "under the kitchen table"]},
        {name: "Calvin", fav_food: "cheese", sleep_spots: ["the closet","the couch", "the bathtub"]}
    ]
    res.render('molly&holly',{cats:cats_array});
})

app.get('/cats/calvin', (req, res)=>{
    var cats_array = [
        {name: "Toulouse", fav_food: "tuna", sleep_spots: ["the foot of the bed","the couch", "a tree"]},
        {name: "Holly & Molly", fav_food: "salmon", sleep_spots: ["the attic","the couch", "under the kitchen table"]},
        {name: "Calvin", fav_food: "cheese", sleep_spots: ["the closet","the couch", "the bathtub"]}
    ]
    res.render('calvin',{cats:cats_array});
})

app.listen(8000, ()=> console.log('listening on port 8000 <3'))