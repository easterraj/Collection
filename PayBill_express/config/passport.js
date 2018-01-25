var JwtStrategy = require('passport-jwt').Strategy,
ExtractJwt = require('passport-jwt').ExtractJwt;

// load up the user model
var User = require('../models/login/user-login');
var config = require('../config/database'); // get db config file

module.exports = function(passport) {
var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('JWT');
opts.secretOrKey = config.secret;
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    console.log("payload",jwt_payload);
User.findOne({email_id: jwt_payload.email_id}, function(err, user) {
    console.log("inside Findone");
      if (err) {
          return done(err, false);
      }
      if (user) {
          done(null, user);
      } else {
          done(null, false);
      }
  });
}));
};