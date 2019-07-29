const mongoose = require('mongoose');
const Schema = mongoose.Schema;



new RiderSchema = new Schema({

    rider_name:{
        type: String,
        required:true
    },
    phone_number:{
        type: Number,
        required:true
    },
    plate_number:{
        type: String,
        required:true,
        unique: true
    },
    sacco_registered:{
        type: String,
        required:true,
        unique: true
    }

});


module.exports = Rider = mongoose.model('Rider', RiderSchema);