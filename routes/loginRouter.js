const express = require('express')
const Router = express.Router()
const User = require('../models/user')
var md5 = require('md5');

Router.route('/').get(function (req, res) {
    res.render('login', { err: "" })
});

Router.route("/").post(function (req, res) {
    const username = req.body.username
    const password = req.body.password
    User.findOne({ username: username, password: md5(password) }, function (err, user) {
        if (user) {
            console.log("login success")
        } else {
            res.render('login', { err: "ข้อมูลไม่ถูกต้อง" })
        }
    })
})


module.exports = Router