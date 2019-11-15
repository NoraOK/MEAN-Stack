const mongoose = require('mongoose');

cake = mongoose.model('Cake')

module.exports = {
    
    index: function(req, res){
        cake.find({})
            .then(data => res.json(data))
            .catch(err => res.json(err));
    },
    findCake: function(req, res){
        cake.findOne({_id: req.params.id})
            .then((data)=>{res.json(data)})
            .catch(err => res.json(err));
    },
    new: function(req, res){
        console.log(req.body)
        cake.create(req.body)
            .then(data => res.json(data))
            .catch(err => res.json(err))
    },
    updateCake: function(req, res){
        console.log(req.body)
        cake.findById({_id: req.params.id})
        .then(cake =>{
            cake.ratings.push(req.body)
            if(cake.ratings.length > 1){
                var total = 0;
                for(let rating of cake.ratings){
                    total += rating.rating;
                }
                console.log(total)
                cake.avgRating = Math.round((total/cake.ratings.length) *10)/10
            }else{
                cake.avgRating = req.body.rating
            }
            cake.save()
            .then(cake => res.json(cake))
        })
        .catch(err => res.json(err))
        
    },

    deleteCake: function(req, res){
        cake.remove({_id: req.params.id})
            .then(function(err, deleted){
            if(err){
                res.json(err);
            }else{
                res.json(deleted);
            }
        })
    }

}
