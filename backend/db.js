const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://manav25gohil:NBOFnjuXZ8XWPVHw@cluster0.7du3n.mongodb.net/payTm')
    .then(() => console.log("connected to mongoDB"))
    .catch((err) => console.error('Mongodb connection error: ', err))

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String
})

const accountsSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    balance:{
        type: Number,
        required: true
    }
})

const Account = mongoose.model('Account', accountsSchema)
const User = mongoose.model("User", userSchema)

module.exports = {
    User, 
    Account
}