import * as fs from 'fs';
import * as path from 'path';
import * as HTTPS from 'https';
import express = require("express");
import session = require("express-session");
import cors = require("cors");
import morgan = require("morgan");
import UserController from "./src/user/UserController";

const app = express();
const ssl = '443';
const port = '80';
try {
  const option = {
    ca: fs.readFileSync('/etc/letsencrypt/live/codeflights.xyz/fullchain.pem'),
    key: fs.readFileSync(path.resolve(process.cwd(), '/etc/letsencrypt/live/codeflights.xyz/privkey.pem'), 'utf8').toString(),
    cert: fs.readFileSync(path.resolve(process.cwd(), '/etc/letsencrypt/live/codeflights.xyz/cert.pem'), 'utf8').toString(),
  };

  HTTPS.createServer(option, app).listen(ssl);
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
  },
}));

app.use(cors({
  origin: true,
  credentials: true,
}));

app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false,
}));

app.get('/', (req, res) => {
  res.send('hi');
});

app.use(UserController.getRouter());

app.listen(port);
