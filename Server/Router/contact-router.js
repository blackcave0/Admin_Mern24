const express = require('express');
const router = express.Router();
const ContactForm = require('../Controllers/contact-controller')

// -- This route file belong from [controller file => contact-controller.js]
router.route('/contact').post(ContactForm)
module.exports = router;