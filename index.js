const express = require('express')
const app = express()

app.set('view engine', 'ejs');

//* Middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))

//* Listen to PORT:3000
let server = app.listen(3000, () => {
    console.log('Up and Running at http://localhost:', server.address().port)
});

const router = require('./controllers/router')
app.use('', router)