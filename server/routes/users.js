const express = require('express')
const router = express.Router();
const userControllers = require('../controllers/user/index')
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy

router.use(passport.initialize());
router.use(passport.session());

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

passport.use(new GoogleStrategy({
  clientID: "956886343865-f8080heu2d93mukf82e027btrg0mgcl8.apps.googleusercontent.com",
  clientSecret: "aJx_2Fz6CygfcjdsPwY3XHKe",
  callbackURL: 'http://localhost:8080/user/signin/callback'
}, function (accessToken, refreshToken, profile, done) {
  process.nextTick(function () {
    user = profile;
    return done(null, user);
  });
}));


router.get('/signin', userControllers.signin.google)
router.get('/signin/callback', userControllers.signin.googleAuth)
router.post('/signup', userControllers.signup.post)
router.post('/signin', userControllers.signin.post)


router.post('/logout', userControllers.logout.post)
router.post('/info', userControllers.info.post)
router.get('/info', userControllers.info.get)

module.exports = router;