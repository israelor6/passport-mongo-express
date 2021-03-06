const router = require('express').Router()
//Initializes an instance of the Router class.
const User = require('../models/user');
const bcrypt = require('bcryptjs');
//imports the user model and the BcryptJS Library
// BcryptJS is a no setup encryption tool
const secret = process.env.secret;
//gives us access to our environment variables 
//and sets the secret object.
const passport = require('passport');
const jwt = require('jsonwebtoken');
//imports Passport and the JsonWebToken library for some utilities
router.post('/register', (req,res) => {
     User.findOne({email: req.body.email})
         .then(user => {
             if(user){
                let error = 'Email Address Exists in Database.';
                return res.status(400).json(error);
             } else {
                const newUser = new User({
                      email: req.body.email,
                      password: req.body.password
                 });
                 bcrypt.genSalt(10, (err, salt) => {
                    if(err) throw err;
                    bcrypt.hash(newUser.password, salt,
                                        (err, hash) => {
                        if(err) throw err;
                        newUser.password = hash;
                        newUser.save().then(user => res.json(user))
                           .catch((err) => {
                              res.status(400).json(err)
                           });
                   });
               });
          }
     });
});

router.post('/login', (req,res) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({ email })
         .then(user => {
            if (!user) {
               return res.status(404).json("no email found");
           }
           bcrypt.compare(password, user.password)
                  .then(isMatch => {
                     if (isMatch) {
                       const payload = {
                         id: user._id,
                         email: user.email
                      };

                      jwt.sign(payload, secret, { expiresIn: 86400 * 30 },
                              (err, token) => {
                                if (err) res.status(500)
                                .json({ error: "Error signing token",
                                       raw: err }); 
                                 res.json({ 
                                 success: true,
                                 token: `Bearer ${token}` });
                      });      
                } else {
                    errors.password = "Password is incorrect";                        
                    res.status(400).json(errors);
        }
      });
    });
});

module.exports = router;