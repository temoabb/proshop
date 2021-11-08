import mongoose from 'mongoose';
import dotenv from 'dotenv';

import users from './data/users.js';
import products from './data/products.js';

import User from './models/userModel.js';
import Product from './models/productModel.js';
import Order from './models/orderModel.js';

import connectDB from './config/db.js';
import colors from 'colors';


dotenv.config();
connectDB();


const importData = async () => {
  try {
    await Order.deleteMany(); // here we do not pass anything between ( ). It means that it deletes everything
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);

    const adminUser = createdUsers[0]._id
    // in users.js first element is Admin User obj. So we use [0]._id here. Also remember when data is entered into mongodb, it autiomatically creates an _id fields.

    const sampleProducts = products.map(product => ({ ...product, user: adminUser }));

    await Product.insertMany(sampleProducts);

    console.log('Data Imported!'.green.inverse);
    process.exit();

  } catch (error) {
    console.log(`${error}`.red.inverse);
    process.exit(1); // .exit(1) means exit with failure
  }
};


const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log(`Data Destroyed!`.red.inverse);
    process.exit();

  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};


if (process.argv[2] === '-d') destroyData()
else importData();


// (property) NodeJS.Process.argv: string[]
// The process.argv property returns an array containing the command-line arguments passed when the Node.js process was launched. The first element will be execPath. See process.argv0 if access to the original value of argv[0] is needed. The second element will be the path to the JavaScript file being executed. The remaining elements will be any additional command-line arguments.



// For example, assuming the following script for process-args.js:

// import { argv } from 'process';

// // print process.argv
// argv.forEach((val, index) => {
//   console.log(`${index}: ${val}`);
// });



// Launching the Node.js process as: $ node process-args.js one two=three four
// Would generate the output:

// 0: /usr/local/bin/node
// 1: /Users/mjr/work/node/process-args.js
// 2: one
// 3: two=three
// 4: four
// @since — v0.1.27

// @since — v0.1.27


