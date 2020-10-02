const express = require('express');
const session = require('express-session');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const port = '8080';
const usersRouter = require('./routes/users')
const postRouter = require('./routes/posts')
const searchRouter = require('./routes/search')
const authRouter = require('./routes/auth')
const fs = require('fs');
const path = require('path');
const HTTPS = require('https');


app.use(session({
  secret: 'codeflightsLTD@',
  resave: false,
  saveUninitialized: true,
  cookie: {
    sameSite: 'none',
    secure: true,
  }
}));

app.use(cors({
  origin: true,
  credentials: true
}));


app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.post('/', (req, res) => {
  res.send('hi')
})

app.use('/user', usersRouter);
app.use('/post', postRouter);
app.use('/search', searchRouter);
app.use('/auth', authRouter)
app.listen(port, () => console.log(`http server is on ${port}`))