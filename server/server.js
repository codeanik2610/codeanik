require('dotenv').config();
const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');
const routes = require('./routes');
const router = require('express').Router();
const https = require('https');
const download = require('image-downloader');
const path = require('path');
const { createWorker } = require('tesseract.js');

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', routes);
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on Port ${PORT}`);
});
