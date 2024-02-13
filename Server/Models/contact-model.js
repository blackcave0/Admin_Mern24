// In this component we can write code for user contact, this componet also for who is not login or register in our webpage

// --- Here we can destructured directly
const {Schema, model} = require("mongoose");

//! Both are same 
// const constactSchema = new Mongoose.Schema()

const contactSchema = new Schema({
  username : {type : String, required : true},
  email : {type : String, required : true},
  message : {type : String, required : true},
});

// --- Creating a model or a Collection
const Contact = new model('Contact', contactSchema);

module.exports = Contact;