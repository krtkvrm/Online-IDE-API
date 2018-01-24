const express = require('express')

const bodyParser = require('body-parser')

const multer = require('multer')()

const run = require('./routes/run')

const app = express()

const SERVER_PORT = process.env.PORT || 8080

// Middlewares to parse POST Resquest

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(multer.array()); 

// Parsers End Here

app.use(express.static(__dirname + '/includes'))

app.use('/run', run)


app.use((req, res) => {
    res.send("404 Error")
})

var server = app.listen(SERVER_PORT, (err) => {
    console.log('Server Started! on Port : ' + server.address().port )
})