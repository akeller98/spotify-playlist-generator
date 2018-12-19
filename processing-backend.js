let express = require('express')
let bodyParser = require('body-parser')
let app = express()

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.post('/process',function(req,res){
  console.log(req);
});

let port = process.env.PORT || 5000
console.log(`Listening on port ${port}.`)
app.listen(port)
