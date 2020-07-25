const User = require('../models/users');
const passport = require('passport');
const viewPath = 'sessions';

exports.new = (req, res) => {
  res.render(`${viewPath}/new`, {
    pageTitle: 'Login'
  });
};

// Step 1: Create an action that will authenticate the user using Passport
exports.create = (req, res, next) => {
  passport.authenticate('local', (err,user) => {
      if(err || !user) return res.status(401).json({
          status: 'failed',
          message: 'Not Authorized',
          error: err
      });

      req.login(user, err =>{
          if (err) return res.status(401).json({
              status: 'failed',
              message: 'Not Authorized',
              error: err                 
          });
         
          return res.status(200).json({
              status: 'success',
              message: 'Logged in Successfully',
              user: {
                  _id: user._id,
                  fullname: user.fullname,
                  email: user.email
              }
          })
      })
  })(req,res, next);
};
// Step 2: Log the user out
exports.delete = (req, res) => {
  req.logout();
  req.flash('success', 'You were logged out successfully.');
  res.redirect('/');
};