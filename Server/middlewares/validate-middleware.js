// ? After creating schema using [zod] we will need to varify using middleware
// << This component belong to [validator file]

// --- this component use in router file=> auth-router
/* const validate = (schema) => ()=>{

} */

// ---Schema validation for signup
function validate (schema) {
  return async function (req, resp, next){
    try {
      const parseBody = await schema.parseAsync(req.body)
      req.body = parseBody;
      next()
    } catch (err) {
      // [error-middleware]
      const status = 422;
      const extraDetails = err.errors[0].message
      const message = 'Fill all blanks do not left empty';
      // [error-middleware if we got error or message from server]
      const error = {status, message, extraDetails}
      
      // console.log(message);
      // resp.status(400).json({msg : message})

      // -- For Error => From [error-middleware]
      next(error)
    }
  }
}

module.exports = validate;