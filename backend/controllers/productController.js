import Product from '../models/productModel.js';
import mongoose from 'mongoose'
// all_products, single_product;

const all_products = (req, res) => {
  Product.find()
    .then(results => res.json(results))
    .catch(err => console.log(err))
}

const single_product = async (req, res, next) => {

  try {
    const product = await Product.findById(new mongoose.Types.ObjectId(req.params.id));
    console.log('----------- product ---------', product);

    if (product) {
      res.json(product)
    } else {
      res.status(404)
      next()
      // throw new Error('Product not found')
    }
  } catch (error) {
    // res.status(500).send({ error });
    next(error)
    // throw new Error('Internal server error');
  }
}

export { all_products, single_product }