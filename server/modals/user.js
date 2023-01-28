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
        {
        type: Boolean,
        default: false,
        time: Date,
        },
        {
            type: Date,
        }
    ],
    wallet: {
        type: Number,
        default: 0
    },
    exit : [
        {
            type: Boolean,
            default: true,
            time: Date,
        },
        {
            type: Date,
        }
    ],
    transactions: [{
        amount: Number,
        time: Date,
        boarding: Number,
        destination: Number
    }],
    walletTransactions: [ {
        amount: Number,
        time: Date,
        status: Boolean,
        razorpay_payment_id: String,
        razorpay_order_id: String,
    }],
    sourceStation: {
        type: Schema.Types.ObjectId
    },
    destinationStation: {
        type: Schema.Types.ObjectId
    },
    
    
},{timestamps: true})

module.exports = mongoose.model('User',userSchema)