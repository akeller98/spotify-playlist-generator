const express            = require('express')
const bodyParser         = require('body-parser')
const request            = require('request')
const fs                 = require('fs');
const app                = express()

const subscriptionKey = '642d96f8e0094d4182c29107f275c282';
const uriBase = 'https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect';

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

let result = '';
let image_raw  = '';
let max = '';

function imgProcess(){
  const params = {
    'returnFaceId': 'true',
    'returnFaceLandmarks': 'false',
    'returnFaceAttributes': 'emotion'
  };
  const options = {
    uri: uriBase,
    qs: params,
    body: image_raw,
    headers: {
      'Content-Type': 'application/octet-stream',
      'Ocp-Apim-Subscription-Key': subscriptionKey
    }
  };
  request.post(options, (error,response,body) => {
    if(error) {
      console.log('Error: ', error);
      return;
    }
    let jsonResponse = JSON.parse(body);
    //console.log(image_raw);
    result = jsonResponse[0].faceAttributes.emotion;
    let values = Object.values(result);
    let max_val = Math.max(...values);
    let max_index = values.indexOf(max_val);
    max = Object.keys(result)[max_index];
    console.log(values);
    console.log(max_val);
    console.log(max_index);
    console.log(max);

  });
}

app.post('/process',function(req,res){
  //console.log(req.body.image);
  image_raw = Buffer.from(req.body.image.substring(23),'base64');
  res.send(req.body);
  imgProcess();
});

app.get('/process',function(req,res){
  //imgProcess();
  //console.log(image_raw)
  //console.log(img_data);
  res.send({
    //"processed": result,
    "max": max
  });
});

let port = process.env.PORT || 5000
console.log(`Listening on port ${port}.`)
app.listen(port)
