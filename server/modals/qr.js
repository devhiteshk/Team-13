const mongoose = require("mongoose")
const Schema = mongoose.Schema


var QrSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    inQr: {
        type: String,
    },
    outQr: {
        type: String,
    },
    
},{timestamps: true})

module.exports = mongoose.model('Qr',QrSchema)