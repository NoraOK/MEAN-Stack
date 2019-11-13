const express = require('express');
const app = express();
const mongoose = require('mongoose');
const flash = require('express-flash');
const session = require('express-session');
User = mongoose.model('User')

module.exports = {

    index: function(req, res) {
        res.render('index')
    },

    quotes: function(req, res) {
        User.find().sort('-createdAt')
            .then(users => {
                var context = { users: users };
                res.render('quotes', context)

            })
            .catch(err => res.json(err))
    },

    create_quotes: function(req, res){
        const userData = req.body;
        User.create(userData)
            .then(newUser => {
                console.log("User created: ", userData);
                res.redirect('/quotes')
            })
            .catch(err => {
                console.log("We have an error", err);
                for (var key in err.errors) {
                    req.flash(key, err.errors[key].message);
                }
                res.redirect('/')
            })
    },

    clear: function(req, res){
        User.remove()
            .then(deletedUsers => {
                res.redirect('/')
            })
            .catch(err => res.json(err));
    },

    back: function(req, res){
        res.redirect('/')
    },

    skip: function(req, res){
        res.redirect('/quotes')
    }

};
