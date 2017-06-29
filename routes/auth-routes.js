const express = require('express');

const UserModel = require ('../models/user-model.js');

const bcrypt = require ('bcrypt');

const router = express.Router();

router.get('/signup',(req, res, next)=>{
  res.render('auth-views/signup-views.ejs');
});

router.post('/signup',(req, res, next)=>{
  // if username or password are empty
  if( req.body.signupUsername === '' || req.body.signupPassword ===''){
    // Display an error yo the user
      res.locals.messageForDumbUsers = 'Please provide both username and password';

    res.render('auth-views/signup-views.ejs');
    return;
  }
  //Otherwise check if the username submitted is taken
  UserModel.findOne(
    { username: req.body.signupUsername},

    (err, userFromDb) => {
      //if username is taken, the 'userFromDb'
      if (userFromDb){
        //if that is the case, display an error to the user
        res.locals.messageForDumbUsers = 'Sorry, Username not available';
        res.render('auth-views/signup-views.ejs');
        return;
      }

      //if we get here, we are ready to save the new user in the DB
      const salt = bcrypt.genSaltSync(10);
      const scrambledPassword = bcrypt.hashSync(req.body.signupPassword, salt);

      const TheUser = new UserModel({
        fullName: req.body.signupFullName,
        username: req.body.signupUsername,
        encryptedPassword:scrambledPassword,
      });

      TheUser.save((err)=>{
        if(err){
          next(err);
          return;
        }
        // 
        res.redirect('/');
      });
    }
  );
});

module.exports = router;
