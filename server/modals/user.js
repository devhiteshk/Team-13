const mongoose = require("mongoose")
const Schema = mongoose.Schema


var userSchema = new Schema({
    name: {
        type: String,
        required: true,
        maxLength: 32,
        trim:true,
    },
    email : {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role : {
        type: Number,
        default: 0,
    },
    phoneNumber: {
        type: Number,
        default: 0,
    },
    enter: [
        
    ],
    wallet: {
        type: Number,
        default: 0
    },
    transactions: [{
        amount: Number,
        time: Date,
        boarding: String,
        destination: String
    }],
    walletTransactions: [ {
        amount: Number,
        time: Date,
        status: Boolean,
        razorpay_payment_id: String,
        razorpay_order_id: String,
    }],
    sourceStation: {
        type: String,

    },
    creationTime: {
        type:  Date,
        default: new Date(),
    }
   
    
    
})

module.exports = mongoose.model('User',userSchema)