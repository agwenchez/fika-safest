const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser')
const logger = require('morgan')
const Riders = require("./models/Riders.js")
const port = process.env.PORT || 3030
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.post('/insert',(req,res, next)=> {
  const {rider_name, plate_number, sacco}= req.body;
  // console.log(r÷÷÷ider);
  const newRider= new Riders({
    rider_name,
    plate_number,
    sacco
  })
  newRider.save()
  .then(rider=>res.json(rider))
  .catch(err=> res.status(500).json({ succeess: false}));
})
app.post('/', (req, res) => {
  let {sessionId, serviceCode, phoneNumber, text} = req.body
  var length = text.split('*').length;
  var txt = text.split('*');
  if (text == '') {
    // This is the first request. Note how we start the response with CON
    let response = `CON Welcome to Fika Safe. Please pick an option below
    1. Search a rider
    2. Rate a rider
    `
    res.send(response)
  } else if (text == '1') {
    // Business logic for first level response
    let response = `CON Please enter the motorbike plate number`
    res.send(response)
  } else if (text == '2') {
    // Business logic for first level response
    let response = `CON Enter the motorbike plate number:`
    res.send(response)
  }
  else if(length === 2){
    let initial_selection = txt[0];
    // let phone_number = txt[length - 1];
     let client_phone_number = phoneNumber;
     let sms_message ;
    if(initial_selection == '1'){a
      // search rider
      // query from databse
      // let sms_message = `We are not able to verify the rider information provided.`;
       let rider_detail = txt[length - 1];
// db manenos
Riders.findOne({plateNumber: rider_detail}).exec().then((result) => {
  if(result){
    let rider = result;
      sms_message = `Rider ${rider.rider_name} whose number plate: ${rider.plateNumber}is registered with ${rider.sacco}.`;
      
  } else {sms_message = `We are not able to verify the rider information provided.`}
}
).catch(err=>
  {
    res.status(500).send({message:`internal server error:${err}`})
  })
      
        const credentials = {
          apiKey: 'eaba72a3ad42958d651cb1e48f8fae648c872fe162898ded1cb5da8608148c7f',
          username: 'Agwenchez',
      }
      
      // Initialize the SDK
      const AfricasTalking = require('africastalking')(credentials);
      
      // Get the SMS service
      const sms = AfricasTalking.SMS;
      
      function sendMessage() {
          const options = {
              // Set the numbers you want to send to in international format
              to: [client_phone_number],
              // Set your message
              message: sms_message
              // Set your shortCode or senderId
          }
      
          // That’s it, hit send and we’ll take care of the rest
          sms.send(options)
              .then(console.log)
              .catch(console.log);
      }
      
      sendMessage();
      };
      
      // initialize Africas Talking
      // send SMS
      // sendSMS(client_phone_number, sms_message);
      // send sms back to customer
      let response='END Thank you for your query. You will receive an SMS shortly';
      res.send(response);
    }
    else if(initial_selection == '2'){
      // rate rider
      // Business logic for first level response
      let response= 'CON Rate a rider on a scale of 1 to 5';
      // This is a terminal request. Note how we start the response with END
      
      res.send(response);
    }
  
  else if(length === 3){
    // let rider_rating = txt[length - 1];
    // let plate_number = txt[length - 2];
    // go to databse get rider information
    // set rating for rider and upate
    // Business logic for first level response
    let response= 'END Thank you for your feedback.';
    // This is a terminal request. Note how we start the response with END
    
    res.send(response);
  }
    else {
    res.status(400).send('Bad request!')
  }
})
mongoose.connect( 'mongodb+srv://agwera:agwenchez@fika-safe-dlpvb.mongodb.net/fika-safest',
{
    // useMongoClient: true,
    useNewUrlParser:true,
    useCreateIndex:true
}
).then(()=>{
  app.listen(port, () => {
    console.log(`Server running on port ${port}`)
  })
}).catch(err=>{
  console.log(`unable to connect to databse:${err}`);
})