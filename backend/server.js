import express from 'express';  // const express = require('express');
import dotenv from 'dotenv';  // const dotenv = require('dotenv');
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';

import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import colors from 'colors';


dotenv.config(); // with connectDB() ?
const app = express();
connectDB();

app.get('/', (req, res) => {
  res.send('API is running....'); // res.send or res.json is going to convert something on json type:
})

app.use('/api/products', productRoutes);
// app.use(function (req, res, next) { console.log('next middleware was called'); return res.send({ error: 'vano' }) });
app.use(notFound);
app.use(errorHandler);

const PORT = 5000;
app.listen(PORT, console.log(`Server is running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold))



// npm run server
// node --version

// "type": "module", -> in package.json to replace require with import;

// app.use(function (error, req, res, next) {
//   return res.send({ error: 'Something wen wrong' })
// })

// app.all('*', (req, res, next) => {
//   res.send({ error: 'Route not found' })
// })