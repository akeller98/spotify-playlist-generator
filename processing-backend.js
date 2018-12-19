let express = require('express')
let request = require('request')
let querystring = require('querystring')

let app = express()

let port = process.env.PORT || 5000
console.log(`Listening on port ${port}.`)
app.listen(port)
