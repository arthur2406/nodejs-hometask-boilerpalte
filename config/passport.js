const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const UserService =  require('../services/userService');
const { errorHandlingMiddleware } = require('../middlewares/error.handling.middleware');
const validatePassword = require('../utils/password.utils').validatePassword;


const customFields = {
  usernameField: 'email',
  passwordField: 'password'
};

const verifyCallback = (email, password, done) => {
  UserService.search({ email })
    .then(user => {
      if(!user) { return done(null, false) }

      const isValid = validatePassword(password, user.hash, user.salt);

      if (isValid) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    })
    .catch(err => {
      done(err)
    });
};

const strategy = new LocalStrategy(customFields, verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((userId, done) => {
  UserService.searchById(userId)
    .then(user => {
      done(null, user);
    })
    .catch(err => done(err))
});