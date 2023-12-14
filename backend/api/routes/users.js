var express = require('express');
var router = express.Router();
var userModel = require('../models/user');

const bcrypt = require('bcrypt');

const checkEmail = async(req, res, next) => {
    try {
        const email = req.body.Email;
        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            return res.status(200).json({
                msg: "Email Already Exists",
                results: existingUser
            });
        }

        next();
    } catch (err) {
        // Handle errors appropriately
        console.error(err);
        res.status(500).json({
            msg: "Internal Server Error"
        });
    }
};

/* GET users listing. */
router.get('/', function(req, res, next) {
    var userDetails = new userModel({
        name: 'Vaishnavi',
        email: 'vikas@gmail.com',
        password: 'vikas@123',
    });

    userDetails.save()
        .then(savedUser => {
            res.render('index', { title: 'User Data Inserted' });
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Error inserting user data');
        });
});

router.post('/register', checkEmail, (req, res, next) => {
    bcrypt.hash(req.body.Password, 10, (err, hash) => {
        if (err) {
            return res.status(400).json({
                msg: "Something Wrong, Try Later!",
                results: err
            });
        }

        const userDetails = new userModel({
            name: req.body.Name,
            email: req.body.Email,
            password: hash,
            role: 'Author'

        });

        userDetails.save()
            .then(resResult => {
                res.status(201).json({
                    msg: "User Created Successfully",
                    results: resResult
                });
            })
            .catch(err => {
                res.json(err);
            });
    });
});

router.post("/login", function(req, res, next) {

    var email = req.body.Email;
    userModel.find({ email: email })
        .exec()
        .then(user => {
            if (user.length < 1) {
                res.status(200).json({
                    msg: "Auth Failed",
                    UserData: '',
                    status: 'error'
                });
            } else {
                bcrypt.compare(req.body.Password, user[0].password, function(err, result) {
                    if (err) {
                        res.json({
                            msg: "Auth Failed",
                            UserData: '',
                            status: 'error'
                        });
                    }
                    if (result) {
                        res.status(200).json({
                            msg: "User Login Successfully",
                            UserData: user,
                            status: 'success'
                        });
                    } else {
                        res.json({
                            msg: "Auth Failed",
                            UserData: '',
                            status: 'error'
                        });
                    }
                });

            }
        })
        .catch(err => {
            res.json({
                error: err
            });
        })


});

module.exports = router;