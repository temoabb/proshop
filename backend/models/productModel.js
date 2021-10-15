import mongoose from 'mongoose';

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true }, // average rating of all reviews
    comment: { type: String, required: true },
  },
  { timestamps: true }
);


const productSchema = mongoose.Schema(
  {
    // only admin can create a product and we wonder which user, e.i. which admin is creating a product
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' }, // it adds relationship between product and user

    name: { type: String, required: true },
    image: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    reviews: [reviewSchema],
    rating: { type: Number, required: true, default: 0 },
    numReviews: { type: Number, required: true, default: 0 },
    price: { type: Number, required: true, default: 0 },
    countInStock: { type: Number, required: true, default: 0 },
  },
  { timeStamps: true }
);

const Product = mongoose.model('Product', productSchema);

export default Product;