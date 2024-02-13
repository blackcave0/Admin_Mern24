const express = require("express")
const { home, register, login } = require("../Controllers/Auth-controller")
const validate = require('../middlewares/validate-middleware');
const signupSchema = require("../validators/auth-validators")
const router = express.Router()


router.route('/').get(home)
router.route('/signup').post(validate(signupSchema),register)
router.route('/login').post(login)
module.exports = router