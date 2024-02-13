const Contact = require('../Models/contact-model');

const contactForm = async (req, resp)=>{
  try {
    const response = req.body;
    await Contact.create(response);
    return resp.status(200).json({msg : 'message send successfully'})
  } catch (error) {
    return resp.status(500).json({error : 'message not delivered'})
    
  }
}

module.exports = contactForm