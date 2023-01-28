const mongoose = require("mongoose")
const Schema = mongoose.Schema

var StationDensity = new Schema({
    name: {
        type: String,
        required: true,
    },
    creationTime: {
        type:  Date,
        default: new Date(),
    }
    
})

module.exports = mongoose.model('StationDensity',StationDensity)