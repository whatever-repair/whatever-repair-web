const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multipart = require('connect-multiparty');
const morgan = require('morgan');

const app = express();

let port = 8000;

app.use(morgan('dev'));
app.use(multipart({ uploadDir: `${__dirname}/upload` }));

// mongoose.connect('mongodb://localhost/???');

app.use(bodyParser.json());

app.use(express.static(`${__dirname}/../public`));

app.listen(port, function() {
  console.log('Server listening on port ', port);
});