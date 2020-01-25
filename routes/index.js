const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
//welcome page
router.get('/', (req,res)=>res.render('welcome'));

//dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) =>
 res.render('dashboard', {
     user: req.user
 }));

 //profile
router.get('/user/profile', ensureAuthenticated, (req, res) =>
    res.render('profile', {
        user: req.user
    }));

//attendance
router.get('/user/attendance', ensureAuthenticated, (req,res) =>
    res.render('attendance', {
        user: req.user
    })
)

//update attendance
router.get('/user/updateattendance', ensureAuthenticated, (req, res) =>
    res.render('updateattendance', {
        user: req.user
    })
)

//student details
router.get('/user/students', ensureAuthenticated, (req, res) =>
    res.render('students', {
        user: req.user
    })
)

//Marks Find
router.get('/user/marksfind', ensureAuthenticated, (req, res) =>
    res.render('marksfind', {
        user: req.user
    })
)

//update marks
router.get('/user/updatemarks', ensureAuthenticated, (req, res) =>
    res.render('updatemarks', {
        user: req.user
    })
)

//settings
router.get('/user/settings', ensureAuthenticated, (req, res) =>
    res.render('settings', {
        user: req.user
    })
)

module.exports = router;