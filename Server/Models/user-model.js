/* 
    Schema : Define the structure of the documents within a coolection.
    It specifes the fields, their types and any additional constraints or validations
*/

// --- In this we can Initliaz #Schema, #WebToken and securing password

const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  phone: {
    type: Number,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
})
// const
// ~~~~~~~~:: Securing or Hashing Password :: ~~~~~~~~~~~~~ //
// -- Here "save" are the middleware. This method called [pre method]
userSchema.pre("save", async function (next) {
  // console.log("pre method", this)
  const user = this
  if (!user.isModified("password")) {
    next()
  }

  try {
    const saltRound = await bcrypt.genSalt(10)
    const hash_password = await bcrypt.hash(user.password, saltRound)
    user.password = hash_password
    //! we can write this.password instead of user.password
  } catch (error) {
    console.log(error)
  }
})

// :: --- json token
// usign [methods] we can create lot of function and access in any page
userSchema.methods.generateToken = async function () {
  try {
    return jwt.sign(
      {
        userId: this._id.toString(),
        email: this.email,
        isAdmin: this.isAdmin,
      },
      process.env.JWT_KEY,
      {
        expiresIn: "30d",
      }
    )
  } catch (error) {
    console.log(error)
  }
}

//=> Comparing password for login route
userSchema.methods.comparePass = async function(password){
  return bcrypt.compare(password, this.password)
}

// --- Define the model or the collection name ---
const User = new mongoose.model("User", userSchema)

module.exports = User

/* 
  form validation in advanced leven we can use [zod] = npm i zod
*/
