/* for config file the name with .env this line code  */
require('dotenv').config()
const express = require('express');
const  route  = require('./Router/Auth-router');
const contactRouter = require('./Router/contact-router')
const errorMiddleware = require('./middlewares/error-middleware');
const router = require('./Router/Auth-router');
const app = express();


// --- database and config path
//*-- if you write confige name : config.env  --*/
// dotenv.config({path : './config.env'})

const PORT = process.env.PORT

// --- Initiliazation of Database connection path 
const connectDB = require('./utils/db');

app.use(express.json())
app.use('/api/auth', route);
app.use('/api/form', contactRouter);


app.use(errorMiddleware)
// app.use(router)
/* app.get('/', (req, resp)=>{
  resp.send("Welcome to admin page");
}) */

// --- Retriving database 
connectDB().then(()=>{
  app.listen(PORT, function () { console.log("Listining port .....",PORT); })
})