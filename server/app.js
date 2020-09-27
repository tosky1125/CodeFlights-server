const express = require('express');
const session = require('express-session');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const port = '443';
const usersRouter = require('./routes/users')
const postRouter = require('./routes/posts')
const searchRouter = require('./routes/search')
const authRouter = require('./routes/auth')
const fs = require('fs');
const path = require('path');
const HTTPS = require('https');
const search = require('./controllers/search');
const ssl = '8080'
// const passport = require('passport')
// const GoogleStrategy = require( 'passport-google-oauth20' ).Strategy
// try {
//   const option = {
//     ca: fs.readFileSync('/etc/letsencrypt/live/codeflights.xyz/fullchain.pem'),
//     key: fs.readFileSync(path.resolve(process.cwd(), '/etc/letsencrypt/live/codeflights.xyz/privkey.pem'), 'utf8').toString(),
//     cert: fs.readFileSync(path.resolve(process.cwd(), '/etc/letsencrypt/live/codeflights.xyz/cert.pem'), 'utf8').toString(),
//   };

//   HTTPS.createServer(option, app).listen(port, () => {
//     console.log(`Server is started on port ${port}`);
//   });
// } catch (error) {
//   console.error('[HTTPS] HTTPS 오류가 발생하였습니다. HTTPS 서버는 실행되지 않습니다.');
//   console.warn(error);
// }
app.use(session({
  secret: 'codeflightsLTD@',
  resave: false,
  saveUninitialized: true,
  cookie : {sameSite: 'none', secure : true }
}));
// app.use(passport.initialize());
// app.use(passport.session());
app.use(cors({
	origin : ["https://dox4770prx0oi.cloudfront.net"]
	,	credentials : true
}));
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));




// passport.serializeUser(function(user, done) {
//     done(null, user);
// });

// passport.deserializeUser(function(obj, done) {
//     done(null, obj);
// });

// passport.use(new GoogleStrategy({
//         clientID: "956886343865-f8080heu2d93mukf82e027btrg0mgcl8.apps.googleusercontent.com",
//         clientSecret: "aJx_2Fz6CygfcjdsPwY3XHKe",
//         callbackURL: 'http://localhost:8080/auth/google/callback'
//     }, function(accessToken, refreshToken, profile, done) {
//         process.nextTick(function() {
//             user = profile;
//             return done(null, user);
//         });
//     }
// ));

// app.get('/auth/google', passport.authenticate('google',{ scope : ['profile']}))
// app.get('/auth/google/callback', passport.authenticate('google', {failureRedirect:'/login'}), (req, res)=> res.redirect('/'))
app.get('/',(req, res) => {
  res.send('authenticated')
});
app.use('/user', usersRouter);
app.use('/post', postRouter);
app.use('/search', searchRouter);
app.use('/auth', authRouter)
app.listen(ssl, () => console.log(`http server is on ${ssl}`))

