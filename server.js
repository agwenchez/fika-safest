const app = require('express')()
const bodyParser = require('body-parser')
const logger = require('morgan')
const port = process.env.PORT || 3030
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))


//import rider model
const Rider = require("./models/Riders");


// app.get('/riders', (res,req)=>{
//   Rider.find()
//     .then(riders => res.json(riders))
// })

// app.post('/riders', (res,req)=>{
// const {name, plate_number, sacco} = req.body;

//   const newRider = new Rider({
//     name,
//     plate_number, 
//     sacco

//   })

//   newRider.save()
//   .then(rider => res.json(rider))
//   .catch((err) => {
// 		res.status(500).send({ message: 'could not save the data into the database' })
// 	});
// });


app.post('*', (req, res) => {
  let {sessionId, serviceCode, phoneNumber, text, name, plate_number, sacco} = req.body
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
    
    if(initial_selection == '1'){
      
       let plate_number= txt[length - 1];
       let client_phone_number = phoneNumber;
      
       // search rider
       Rider.findOne({plate_number})
       .then(result=> {
         let rider = result;
         let sms_msg = `Rider ${rider.name} of number plate ${rider.plate_number} is registered with ${rider.sacco}` 
         
         //send sms to user if found
         if(rider) {
         const credentials = {
           username: 'Agwenchez',
           apiKey: '57ab9db440418a57b3ae982f0bc7bd08b8018aebdfed406260d0779e52fe38fe'
         };
     
         // initialize africastalking gateway
         const africastalking = require('africastalking')(credentials);
     
         // sms object of africastalking package
         const sms = africastalking.SMS;
     
         // sending parameters
         const sending_options = {
           to: [client_phone_number],
           message: sms_msg
         };
     
         // send sms
         sms.send(sending_options)
           .then(response => {
             console.log(response);
             res.send(response);
           })
           .catch(error => {
             console.log(error);
             res.send(error);
           });
         }
       }).catch((err) => {
        res.status(500).send({ message: `the rider does not exist ${err}` })
        console.log(err);
      });

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


mongoose
  .connect('mongodb://localhost:27017/sms-app', { 
    useNewUrlParser: true,
    useCreateIndex: true
  }) 
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})




