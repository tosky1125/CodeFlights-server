const express = require('express');
const session = require('express-session');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const port = '8080';
const usersRouter = require('./routes/users')
const postRouter = require('./routes/posts')

app.use(session({
  secret: 'codeflightsLTD@',
  resave: false,
  saveUninitialized: true
}));

app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));

app.get('/', () => console.log('hello world'))

app.use('/user', usersRouter);
app.use('/post', postRouter)

app.listen(port, () => {
  console.log(`Listening to Port ${port}!`)
})