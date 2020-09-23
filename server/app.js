const express = require('express');
const session = require('express-session');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const port = '8080';

app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended : false }));



