/* 
    Schema : Define the structure of the documents within a coolection.
    It specifes the fields, their types and any additional constraints or validations
*/

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username : {
    type : String, require : true,
  },
  email : {
    type : String, require : true,
  },
  phone : {
    type : Number, require : true,
  },
  password : {
    type : String, require : true,
  },
  isAdmin : {
    type : Boolean, default: false
  },

})


