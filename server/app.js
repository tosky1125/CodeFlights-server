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
const ssl = '80'

try {
  const option = {
    ca: fs.readFileSync('/etc/letsencrypt/live/codeflights.xyz/fullchain.pem'),
    key: fs.readFileSync(path.resolve(process.cwd(), '/etc/letsencrypt/live/codeflights.xyz/privkey.pem'), 'utf8').toString(),
    cert: fs.readFileSync(path.resolve(process.cwd(), '/etc/letsencrypt/live/codeflights.xyz/cert.pem'), 'utf8').toString(),
  };


  HTTPS.createServer(option, app).listen(port, () => {
    console.log(`Server is started on port ${port}`);
  });
} catch (error) {
  console.error('[HTTPS] HTTPS 오류가 발생하였습니다. HTTPS 서버는 실행되지 않습니다.');
  console.warn(error);
}
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
app.listen(ssl, () => console.log(`http server is on ${ssl}`))
