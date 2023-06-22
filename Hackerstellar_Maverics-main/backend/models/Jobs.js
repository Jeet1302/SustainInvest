const mongoose = require("mongoose")
const { Schema } = mongoose;

const JobsSchema = new Schema({
    role: {
        type: String,
    },
    company: {
        type: String,
    },
    location: {
        type: String,
    },
    salary: {
        type: String,
    },
    link:{
        type: String,
    }
});

module.exports = mongoose.model("jobs", JobsSchema);