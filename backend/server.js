// const express = require('express');
import express from 'express';

// const dotenv = require('dotenv');
import dotenv from 'dotenv';

import connectDB from './config/db.js';

// const products = require('./data/products');
import products from './data/products.js';

// "type": "module", -> in package.json to replace require with import;


dotenv.config();
connectDB();
const app = express();

// npm run server
// node --version


// products is not in json format, it is a js array, full of js objects, so we need to convert them to json type:
// res.send or res.json is going to convert something on json type:

app.get('/', (req, res) => {
  res.send('API is running....');
})

app.get('/api/products', (req, res) => {
  res.json(products)
})

app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p._id === req.params.id);
  res.json(product);
})

const PORT = 5000;
// console.log(process.env.PORT);

app.listen(PORT, console.log(`Server is running in ${process.env.NODE_ENV} on port ${PORT}`));