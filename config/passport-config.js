//We are configuring Passport in a separate file to avoid making a mess in "app.js"

const passport = require('passport');
const bcrypt = require('bcrypt');

const UserModel = require('../models/user-model.js');

// serializedUser (control what goes inside the bowl)

// deserializeUser (controls what you get when you check the bowl)


//---STRATEGIES 👇----------
            //the diff ways we can log into our app

//passport-local (log in with username and password from a form)
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  {               //1st argument -> settings object
      usernameField:'loginUsername',
      passwordField:'loginPassword',
  },

  (formUsername, formPassword, next)=> { //2nd argument -> callback will be called when a user tries to login)

    // #1 is there an account with the provided username?
    //(is there an user with that username in the database?)
    UserModel.findOne(
      {username: formUsername},
      (err, userFromDb)=> {
        if(err) {
          next(err);
          return;
        }

        //if the username doesn't exist, the 'userFromDb' variable will be empty

        //check if 'userFromDb' is empty
        if (userFromDb === null){
          // In Passport, if you call next() with 'false' in the 2nd position,
          //that means LOGIN FAILED.
          next(null, false);
          return;
        }
        //#2 if there is a user with that username, is the PASSWORD correct?
        if(bcrypt.compareSync(formPassword , encryptedPassword) === false){
          next(null, false);
          return;
        }

        //if we pass those if statements, LOGIN success!
        next(null, userFromDb);
        //In passport, if we call next() with a user in 2nd position,
        //that mean LOGIN SUCCESS.  
      }
    );

  }
));
