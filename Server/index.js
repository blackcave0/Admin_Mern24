const express = require('express');
const app = express();

app.get('/', (req, resp)=>{
  resp.send("Welcome to admin page");
})

app.listen(8000, function () { console.log("Listining port ....."); })