const express = require('express')

const bodyParser = require('body-parser')

const run = require('./routes/run')

const fs = require('fs')

const app = express()

const SERVER_PORT = process.env.PORT || 8000

app.use(bodyParser.json());

app.use(express.static(__dirname + '/includes'))

app.use('/run', run)


app.use((req, res) => {
    res.send("404 Error")
})

var server = app.listen(SERVER_PORT, (err) => {
    console.log('Server Started! on Port : ' + server.address().port )
})

module.exports = app