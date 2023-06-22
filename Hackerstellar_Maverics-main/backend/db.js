const mongoose = require("mongoose");
const mongoUri = 'mongodb+srv://raichandanij:jeet@cluster0.1ulnjvp.mongodb.net/?retryWrites=true&w=majority'


const connectToAtlas = () => {
    mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log("connected..!!");
    }).catch((err) => {
        console.log("error....!!!!" + err);
    })
}

module.exports = connectToAtlas
