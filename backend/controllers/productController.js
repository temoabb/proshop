import Product from '../models/productModel.js';
import mongoose from 'mongoose'


const all_products = (req, res) => {
  Product.find()
    .then(results => res.json(results))
    .catch(err => console.log(err))
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