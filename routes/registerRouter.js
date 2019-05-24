const express = require('express')
const Router = express.Router()
const User = require('../models/user')
var md5 = require('md5');

Router.route('/').get(function (req, res) {
    res.render('register',{err:""})
})

Router.route('/').post(function (req, res) {
    const username = req.body.username
    const password = req.body.password
    User.findOne({ username: username }, function (err, userInServer) {
        if (userInServer) {
            res.redirect('/register',{err:"username ซ้ำ"})
        } else {
            const data = new User({ username: username, password: md5(password) })
            data.save()
            res.redirect('/login')
        }
    })
})

module.exports = Router