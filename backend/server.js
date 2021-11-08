import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';

import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import colors from 'colors';
dotenv.config();

const app = express();
connectDB();

app.use(express.json());

app.get('/', (req, res) => res.send('API is running....')); // res.send or res.json is going to convert something on json type:})
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = 5000;
app.listen(PORT, console.log(`Server is running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold));



// npm run server
// node --version

// "type": "module", -> in package.json to replace require with import;