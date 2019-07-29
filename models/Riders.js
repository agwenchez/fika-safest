const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const RiderSchema = new Schema({

    rider_name:{
        type: String,
        required:true
    },
    plate_number:{
        type: String,
        required:true,
        unique: true
    },
    sacco:{
        type: String,
        required:true
    }

});


module.exports = Rider = mongoose.model('Rider', RiderSchema);