const mongoose = require('mongoose');

author = mongoose.model('Author')

module.exports = {

    index: function(req, res){
        author.find({})
            .then(data => res.json(data))
            .catch(err => res.json(err));
    },
    findAuthor: function(req, res){
        author.findOne({_id: req.params.id})
            .then((data)=>{res.json(data)})
            .catch(err => res.json(err));
    },
    new: function(req, res){
        console.log(req.body)
        author.create(req.body)
            .then(data => res.json(data))
            .catch(err => {
                console.log
            })
    },
    updateAuthor: function(req, res){
        console.log(req.body)
        author.findByIdAndUpdate(req.params.id, req.body)
        .then((data)=>{res.json(data)})
        .catch(err => res.json(err))
    },
    deleteAuthor: function(req, res){
        author.remove({_id: req.params.id})
            .then(function(err, deleted){
            if(err){
                res.json(err);
            }else{
                res.json(deleted);
            }
        })
    }
}