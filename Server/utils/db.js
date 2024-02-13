const mongoose = require('mongoose');

const URI = process.env.DATABASE
// mongoose.connect(URI);

const connectDB = async ()=>{
  try{
    await mongoose.connect(URI)
    console.log("Connected Success")
  }catch (error) {
    console.log('conncetin failed ')
    process.exit(0)
  }
}
// :: npm i dotenv //? 

module.exports = connectDB