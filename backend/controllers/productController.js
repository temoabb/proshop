import Product from '../models/productModel.js';
import mongoose from 'mongoose';

const all_products = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (err) {
    console.log(err)
  }
};

const single_product = async (req, res, next) => {
  try {
    const product = await Product.findById(new mongoose.Types.ObjectId(req.params.id));
    if (product) {
      res.json(product)
    } else {
      // res.status(404)
      next()
    }
  } catch (error) {
    next(error)
  }
};

export { all_products, single_product }