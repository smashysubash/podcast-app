const express = require('express')
const bodyParser = require('body-parser')
const {expressjwt:exjwt} = require('express-jwt')
const jwt = require('jsonwebtoken');
const app = express()
const port = 3001
const cors = require('cors')
const userroutes = require('./routes/userroute')

require('dotenv').config();
const mongoose = require('mongoose');
const mongoString = process.env.URL
mongoose.connect(mongoString);
const database = mongoose.connection
database.on('error', (error) => {
  console.log(error)
})

database.once('connected', () => {
  console.log('Database Connected');
})

const jwtMW = exjwt({
    secret: 'keyboard cat 4 ever',
    algorithms: ["HS256"]
  });

app.use(bodyParser.json())
app.use(
bodyParser.urlencoded({
    extended: true,
})
)

app.use(cors({
    origin: 'http://localhost:3000'
}));


app.post('/signup',userroutes.signup)
app.post('/login', userroutes.login)
app.get('/', jwtMW , (req, res) => {
  console.log("Web Token Checked.")
  res.send('You are authenticated'); 
});

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})
process.on("unhandledRejection", err => {
  console.log(`An error occurred: ${err.message}`)
  server.close(() => process.exit(1))
})