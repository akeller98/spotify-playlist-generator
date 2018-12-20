const express            = require('express')
const bodyParser         = require('body-parser')
const app                = express()

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

let result = '';

app.post('/process',function(req,res){
  console.log(req.body.image);
  result = req.body.image;
  res.send(req.body);
});

app.get('/process',function(req,res){
  res.send({
    processed: result
  });
})

let port = process.env.PORT || 5000
console.log(`Listening on port ${port}.`)
app.listen(port)
