let express = require('express')
let app = express()

let port = process.env.PORT || 5000
console.log(`Listening on port ${port}.`)
app.listen(port)
