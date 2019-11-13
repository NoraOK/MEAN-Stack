const express = require('express');
const app = express();
const mongoose = require('mongoose');
const flash = require('express-flash');
const session = require('express-session');
Person = mongoose.model('Person')

module.exports = {

    index: function(req, res){
        Person.find({}, function(err, data){
            if(err){
                console.log("ERROR");
                res.json(err);
            }else{
                res.json(data);
            }
        })
    },

    newPerson: function(req, res) {
        Person.create({name: req.params.name}, function(err, data){
            if(err){
                res.json(err);
            }else{
                res.json({added:true});
            }
        })
    },

    deletePerson: function(req, res) {
        Person.remove({name: req.params.name}, function(err, data){
            if(err){
                res.json(err);
            }else{
                res.json({removed:true});
            }
        })
    },

    onePerson: function(req, res) {
        Person.find({name: req.params.name}, function(err, data){
            if(err){
                res.json(err);
            }else{
                res.json(data);
            }
        })
    }

}