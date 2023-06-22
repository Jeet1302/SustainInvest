const mongoose = require("mongoose")
const { Schema } = mongoose;

const UsersSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    email:{
        type: String,
        // required: true, 
        // unique: true
    },
    total : {
        type : Number,
        default : 0
    }, 
    balance : {
        type: Number, 
        default: 10000
    }, 
    sustainable : {
        type : Number,
        default: 0,
    }, 
    "stocks": [
        {
          "symbol": String,
          "name":  String,
          "quantity": Number,
          "price": Number,
          "purchase_date": {
            type: Date , 
            default : Date.Now
          }
        },
    ]
});
const users = mongoose.model("users", UsersSchema);
//users.createIndexes();
module.exports = users;