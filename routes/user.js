const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

//User Model
const User = require('../models/Users');

var emale;
var naam;
var pwd;
var tempId;
var tempdoc;
var keycheck=0;
//Login Page
router.get('/login', (req, res) => res.render('Login'));

//check teacher or student
router.get('/register1', (req,res) => res.render('register1'));

//check key for teacher
router.get('/register2', (req, res) => res.render('register2'));



//Register Page
router.get('/register', (req, res) => res.render('Register'));

//profile page
router.get('/profile', (req,res) => res.render('profile'));

//attendance
router.get('/attendance', (req,res) => res.render('attendance'));

//update attendance
router.get('/updateattendance', (req,res) => {
    //console.log(req);
    res.render('updateattendance')});

    //dashboard

router.get('/dashboard', (req,res) => {
    res.render('dashboard')
})
;

//router.get('/details', (req,res) => res.render('details'));

//teacher key check
router.post('/register2', (req, res) => {
    const { key } = req.body;
    if (key !== "abc@199") {
        req.flash('error_msg', 'Please enter valid key!');
        res.redirect('/user/register1');

    }
    else {
        keycheck=1;
        res.redirect('/user/register');
    }
});


//Register Handle
router.post('/register', (req,res) =>{
    const { name, rollnumber, email, password, password2, fathername, mothername, gender, age, dob, contactnumber, bloodgroup, state, pincode, address } = req.body;
   
    let errors = [];

    //Check required fields
    if (!name || !rollnumber || !email || !password || !password2 ){
        errors.push({ msg: 'Please fill in all fields'});
    }

    //check passwords match
    if(password !== password2){
        errors.push({ msg:'Passwords do not match'});
    }
    else{
        pwd=password;
    }

    //check password length
    if(password.length < 8){
        errors.push({ msg:'Password should be atleast 8 characters'});
    }

    if(errors.length > 0){
        res.render('register',{
            errors,
            name,
            rollnumber,
            email,
            password,
            password2,
            fathername,
            mothername,
            gender,
            age,
            dob,
            contactnumber,
            bloodgroup,
            state,
            pincode,
            address
        });
    }
    else{
      //  res.send('pass');
      //Validation passed
      User.findOne({ email: email})
      .then(user =>{
          if(user) {
              //user exists
              errors.push({ msg:'Email is already registered'});
              res.render('register', {
                  errors,
                  name,
                  rollnumber,
                  email,
                  password,
                  password2,
                  fathername,
                  mothername,
                  gender,
                  age,
                  dob,
                  contactnumber,
                  bloodgroup,
                  state,
                  pincode,
                  address
              });

          }
          else{
              User.findOne({ rollnumber: rollnumber })
                  .then(userr => {
              if (userr) {
                  //user exists
                  errors.push({ msg: 'Student ID is already registered' });
                  res.render('register', {
                      errors,
                      name,
                      rollnumber,
                      email,
                      password,
                      password2,
                      fathername,
                      mothername,
                      gender,
                      age,
                      dob,
                      contactnumber,
                      bloodgroup,
                      state,
                      pincode,
                      address
                  });

              }
              
              
              else{
                const newUser = new User({
                    name:name,
                    rollnumber: rollnumber,
                    email:email,
                    password:password,
                    fatherName: fathername,
                    motherName: mothername,
                    gender: gender,
                    age: age,
                    dob: dob,
                    contactNumber: contactnumber,
                    bloodGroup: bloodgroup,
                    state: state,
                    pinCode: pincode,
                    address: address
                });

                // console.log(newUser);
                // res.send('hello');

                //HAsh Password
                bcrypt.genSalt(10, (err,salt) => bcrypt.hash(newUser.password, salt, (err,hash) =>{
                    if(err) throw err;
                    // Set password to hashed
                    newUser.password = hash;
                    //save user
                    if(keycheck==1)
                    {
                        newUser.flag=true;
                    }
                    else{
                        newUser.flag=false;
                    }
                    newUser.save()
                    .then(user =>{
                        req.flash('success_msg', 'You are now registered and can log in');
                        res.redirect('/user/login');
                    })
                        
                   
                    .catch(err => console.log(err));
                }));
            } 
        });  
          }
        
      });
    
    }
});

//update attendance-check student id
router.post('/attendance', (req, res) => {
    console.log(req.body);
    const { rollnumber } = req.body;
    User.findOne({ rollnumber: rollnumber })
    .then(usr =>{
        if(usr)
        {
            tempId=rollnumber;
            User.find({rollnumber: rollnumber},'name rollnumber ',(err, doc)=>{
                if(err)
                {
                    res.render('attendance');
                }
                else{
                    tempdoc=doc;
                    console.log(doc);
                    res.render('updateattendance', {doc});
                }

            });
           //res.render('updateattendance',[tempdoc]);
          //  res.redirect('/user/updateattendance');
        }
        else {
            req.flash('error_msg', 'Inavlid Student Id');
            res.redirect('/user/attendance');
        }
    });

    
    
});
//get data


//update attendance
router.post('/updateattendance', (req, res) => {
    const { rollnumber, mathAttended, mathTotal, mathPercentage, chemAttended, chemTotal, chemPercentage, engAttended, engTotal, engPercentage, phyAttended, phyTotal, phyPercentage } = req.body;
    User.findOne({ rollnumber: rollnumber },(err, foundObject) =>{

        if(err)
        {
            console.log(err);
            res.status(500).send();
        }
        else{
            foundObject.mathAttended=mathAttended;
            foundObject.mathTotal=mathTotal;
            foundObject.mathPercentage=mathPercentage;
            foundObject.chemAttended=chemAttended;
            foundObject.chemTotal=chemTotal;
            foundObject.chemPercentage=chemPercentage;
            foundObject.engAttended=engAttended;
            foundObject.engTotal=engTotal;
            foundObject.engPercentage=engPercentage;
            foundObject.phyAttended=phyAttended;
            foundObject.phyTotal=phyTotal;
            foundObject.phyPercentage=phyPercentage;

            foundObject.save((err, updt) =>
            {
                if(err)
                {
                    req.flash('error_msg', 'Attendance not Updated');
                    res.redirect('/user/attendance');
                }
                else{
                    req.flash('success_msg', 'Attendance updated successfully!');
                    res.redirect('/user/attendance');
                }
            });
        }
    })
        
        });


//students
router.post('/students', (req,res) =>{
/*
    User.find( (err, doc) => {
        if (err) {
            res.render('students');
        }
        else {
            
            res.render('students', { doc });
        }

    });*/
    User.find({}, function (err, usr) {
        var userMap = {};
        var k=0;
        usr.forEach(function (user) {
            userMap[k++] = user;
        });
        //console.log(userMap);
       // console.log(k);
        res.render('students',{userMap});
    });
})

//marks
router.post('/marksfind', (req, res) => {
    console.log(req.body);
    const { rollnumber } = req.body;
    User.findOne({ rollnumber: rollnumber })
        .then(usr => {
            if (usr) {
               
                User.find({ rollnumber: rollnumber }, 'name rollnumber ', (err, doc) => {
                    if (err) {
                        res.render('marksfind');
                    }
                    else {
                        
                        console.log(doc);
                        res.render('updatemarks', { doc });
                    }

                });
                //res.render('updateattendance',[tempdoc]);
                //  res.redirect('/user/updateattendance');
            }
            else {
                req.flash('error_msg', 'Inavlid Student Id');
                res.redirect('/user/attendance');
            }
        });



});

//update marks
router.post('/updatemarks', (req, res) => {
    const { rollnumber, st1Math, st2Math, st3Math, endMath, st1Chem, st2Chem, st3Chem, endChem, st1Eng, st2Eng, st3Eng, endEng, st1Phy, st2Phy, st3Phy, endPhy } = req.body;
    User.findOne({ rollnumber: rollnumber }, (err, foundObject) => {

        if (err) {
            console.log(err);
            res.status(500).send();
        }
        else {
            foundObject.st1Math = st1Math;
            foundObject.st2Math = st2Math;
            foundObject.st3Math = st3Math;
            foundObject.endMath = endMath;
            foundObject.st1Chem = st1Chem;
            foundObject.st2Chem = st2Chem;
            foundObject.st3Chem = st3Chem;
            foundObject.endChem = endChem;
            foundObject.st1Eng = st1Eng;
            foundObject.st2Eng = st2Eng;
            foundObject.st3Eng = st3Eng;
            foundObject.endEng = endEng;
            foundObject.st1Phy = st1Phy;
            foundObject.st2Phy = st2Phy;
            foundObject.st3Phy = st3Phy;
            foundObject.endPhy = endPhy;
            

            foundObject.save((err, updt) => {
                if (err) {
                    req.flash('error_msg', 'Marks not Updated');
                    res.redirect('/user/marksfind');
                }
                else {
                    req.flash('success_msg', 'Marks updated successfully!');
                    res.redirect('/user/marksfind');
                }
            });
        }
    })

});

//change password
router.post('/settings', (req,res) =>{

    const { rollnumber, password1, password2 } = req.body;

    User.findOne({ rollnumber: rollnumber }, (err, foundObject) => {

        if (err) {
            console.log(err);
            res.status(500).send();
        }
        else {
            bcrypt.compare(password1, foundObject.password, (err, isMatch) => {
                if (err){
                    req.flash('error_msg', 'Please Enter Correct Password!');
                    res.redirect('/user/settings');
                }

                if (isMatch) {
                    if (password2.length < 8) {
                        req.flash('error_msg', 'New Password must be greater than or equal to 8 characters!');
                        res.redirect('/user/settings');
                    }
                    else{
                        bcrypt.genSalt(10, (err, salt) => bcrypt.hash(password2, salt, (err, hash) => {
                            if (err) throw err;
                            // Set password to hashed
                            foundObject.password = hash;
                            foundObject.save((err, updt) => {
                                if (err) {
                                    req.flash('error_msg', 'Password not Updated');
                                    res.redirect('/user/settings');
                                }
                                else {
                                    req.logOut();
                                    req.flash('success_msg', 'Password updated successfully');
                                    req.flash('success_msg', ' Please Log In with new Password');
                                    res.redirect('/user/login');
                                   
                                
                                }
                            });

                        }
                        ));
                    }

                }
                else{
                    req.flash('error_msg', 'Please Enter Correct Password!');
                    res.redirect('/user/settings');
                }

            });


            
        }
    })

});






//login handle
router.post('/login', (req,res,next) =>{
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/user/login',
        failureFlash: true
    })(req, res, next);
});



//logout handle
router.get('/logout', (req,res) => {
    req.logOut();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/user/login');
})

//profile
router.get('/profile', (req,res) => {
    res.redirect('/user/profile');
})
module.exports = router;