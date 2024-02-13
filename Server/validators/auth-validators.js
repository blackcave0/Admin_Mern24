const { z } = require("zod")

// --- Creating an object schema for SignUp
const signupSchema = z.object({
  username: z
    .string({ required_error: "Name is require" })
    .trim()
    .min(3, { message: "Name must be at least of 3 characters" }),
  email: z
    .string({ required_error: "Email is require" })
    .trim()
    .min(3, { message: "Email must be at least of 3 characters" }),
  phone: z
    .string({ required_error: "Phone No. is require" })
    .trim()
    .min(10, { message: "Phone No. must be at least of 10 digit" }),
  password: z
    .string({ required_error: "Password is require" })
    .trim()
    .min(4, { message: "Password must be at least of 4 characters" }),
})

module.exports = signupSchema;