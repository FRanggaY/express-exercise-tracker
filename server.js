const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const connectDB = require('./db/connect')
const user = require('./routes/user');
const bodyParser = require('body-parser');

const port = process.env.PORT || 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

app.use('/api', user)

connectDB

app.listen(port, function () {
  console.log('Listening to ' + port)
});