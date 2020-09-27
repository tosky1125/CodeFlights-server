const { users }= require('../../models');
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy

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
passport.initialize();
passport.session();
module.exports = {
  post: (req, res) => {
    const {
      email,
      password
    } = req.body;
    let session = req.session
    users.findOne({
      where: {
        email: email,
        password: password
      }
    }).then(result => {
      if (!result) res.status(401).send(JSON.stringify({
        status: false
      }))
      else {
        session.userid = result.id;
        res.status(201).json({
          id:result.id
        })
      }
    })
  },
  google : (req, res) => {
    passport.authenticate('google',{ scope : ['profile']})
    console.log('hi')
  },
  googleAuth : (req, res) => {
    passport.authenticate('google', {failureRedirect:'/login'}), (req, res)=> res.redirect('/')
  }
}
