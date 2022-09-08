// IMPORT MODULES //
const express = require('express');
const cors = require('cors');
const router = require('./routes/router')
require('dotenv').config();

// APP //
const app =  express();

// MIDDLEWARE //
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

// ROUTES //
app.use('/api/v1', router);

// PORT //
const port = process.env.PORT || 3001;

// LISTENER //
const server = app.listen(port, () => console.log(`Listening to port ${port}`));