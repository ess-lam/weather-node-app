require("dotenv").config();

const express = require('express')
const port = 3000
const app = express();
const cookieParser = require('cookie-parser');
const logger = require('morgan');

app.set('view engine', 'pug')

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


const indexRouter = require('./routes/index')
const weatherRouter = require('./routes/weather')

app.use('/', indexRouter)
app.use('/weather', weatherRouter)



app.listen(port, () => {
  console.log(`node app is running on port ${port}`)
})
