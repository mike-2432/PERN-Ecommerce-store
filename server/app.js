// IMPORT MODULES //
const express = require('express');
const router = require('./routes/router');
const path = require('path');
require('dotenv').config();

// APP //
const app =  express();

// MIDDLEWARE //
app.use(express.json());

// CORS CONFIGURATION //
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested, Content-Type, Accept Authorization"
    )
    if (req.method === "OPTIONS") {
      res.header(
        "Access-Control-Allow-Methods",
        "POST, PUT, GET"
      )
      return res.status(200).json({})
    }
    next()
});

// DEPLOYMENT
if (process.env.NODE_ENV === "production") {
    // server static content
    app.use(express.static(path.join(__dirname, '/static')));
}

// ROUTES //
app.use('/api/v1', router);

// CATCH RANDOM PAGE
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, './static/index.html'));
});

// PORT //
const PORT = process.env.PORT || 3001;

// LISTENER //
const server = app.listen(PORT, () => console.log(`Server starting on port ${PORT}`));