const express = require('express');
const userrouter = require("./Router/router");
const cors = require('cors');
const app = express();

app.use(express.json());

// Enable CORS middleware
app.use(cors());

// CORS headers
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});


// User routes
app.use('/api', userrouter);

app.listen(4000, () => {
  console.log("Server Started on 4000");
});
