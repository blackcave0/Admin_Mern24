const User = require("../Models/user-model")

// << In this componet we can Initiliaz Functions of register, Login and much more.....and we can use in router file 

// for securtin password
const bcrypt = require("bcryptjs")

// ~~~~~~~~:: Home Page :: ~~~~~~~~~~~~~ //
async function home(req, resp) {
  try {
    resp.send("Welcome to Router side ")
  } catch (error) {
    console.log(error)
  }
}

// ~~~~~~~~:: SignUp or Registeration Page :: ~~~~~~~~~~~~~ //
async function register(req, resp, next) {
  try {
    // resp.send("Welcome to register page using controllers")
    console.log(req.body)

    // --- Initiliazation of userSchema over here for user registeration
    const { username, email, phone, password } = req.body
    const userExits = await User.findOne({ email: email })
    if (userExits) {
      return resp.status(400).json({ msg: "Email already Exits" })
    }

    // -- hash the password #securing
    // ! moving this line in user-model
    /* const saltRound = 10;
    const hash_password = await bcrypt.hash(password, saltRound) */

    // --- Method for user creation or registretion
    const userCreated = await User.create({ username, email, phone, password })

    // jsonwebtoken 
    resp
      .status(201)
      .json({
        // msg: userCreated,
        msg : "registration successful",
        token: await userCreated.generateToken(),
        userId: userCreated._id.toString(),
      })
  } catch (error) {
    // throw new Error(error)
    // ? Here... Initiliazation of [error-middleware code for error handling..... ]
    // next is middleware express response
    next(error)
  }
}

// ~~~~~~~~:: Login Page :: ~~~~~~~~~~~~~ //
async function login(req, resp) {
  try {
    const {email, password} = req.body
    const userExist = await User.findOne({email});
    if(!userExist){
      return resp.status(400).json({msg : "Invalid Credentials"});
    }

    // --- comparing password if user exist or valid //?[1st Method]
    // const isUser = await bcrypt.compare(password, userExist.password);

    // --- comparing password if user exist or valid //? [2nd Method]
    const isUser = await userExist.comparePass(password);

    if(isUser == true) {
      resp.status(200).json({
        msg : "Login Successful",
        token : await userExist.generateToken(),
        userId : userExist._id.toString(),
      })
    } else {
      resp.status(401).json({
        msg : 'Invalid Email or Password'
      })
    }
  } catch (error) {
    throw new Error(error)
  }
}

module.exports = { home, register, login }
