
const mongoose = require('mongoose');

task = mongoose.model('Task')

module.exports = {

    index: function(req, res){
        task.find({})
            .then(data => res.json(data))
            .catch(err => res.json(err));
    },
    findTask: function(req, res){
        task.find({_id: req.params.id})
            .then((data)=>{res.json(task)})
            .catch(err => res.json(err));
    },
    new: function(req, res){
        task.create(req.body)
            .then(data => res.json(data))
            .catch(err => res.json(err))
    },
    updateTask: function(req, res){
        task.findById({_id: req.params.id})
            .then((task)=>{
                const taskData = req.body
                if(taskData.title){
                    task.title = taskData.title
                }
                if(taskData.description){
                    task.description = taskData.description
                }
                if(taskData.completed){
                    task.completed =taskData.completed
                }
                return task.save(function(err){
                    if(err){
                        res.json(err);
                    }
                    else{
                        res.json(task);
                    }
                })
            })
            .catch(err => res.json(err));
        
    },

    deleteTask: function(req, res){
        task.remove({_id: req.params.id})
            .then(function(err, deleted){
            if(err){
                res.json(err);
            }else{
                res.json(deleted);
            }
        })
    }



}