const express = require('express')
const router = express.Router();
const passport = require('passport')
const GoogleStrategy = require( 'passport-google-oauth20' ).Strategy

router.use(passport.initialize());
router.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new GoogleStrategy({
      clientID: "956886343865-f8080heu2d93mukf82e027btrg0mgcl8.apps.googleusercontent.com",
      clientSecret: "aJx_2Fz6CygfcjdsPwY3XHKe",
      callbackURL: 'http://localhost:8080/auth/google/callback'
  }, function(accessToken, refreshToken, profile, done) {
      process.nextTick(function() {
          user = profile;
          return done(null, user);
      });
  }
));

router.get('/google', passport.authenticate('google',{ scope : ['profile']}))
router.get('/google/callback', passport.authenticate('google', {failureRedirect:'/login'}), (req, res)=> res.send('hi'))
module.exports = router;