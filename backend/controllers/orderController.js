import Order from '../models/orderModel.js';

// Create new order
// POST /api/orders
// Private

const addOrderItems = async (req, res, next) => {
  try {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice
    } = req.body;

    if (orderItems && orderItems.length === 0) {
      res.status(400);
      next({ message: 'No order items!' });
      return;
    }

    const order = new Order({
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,

      user: req.user._id,
    })

    const createdOrder = await order.save();

    res.status(201);
    res.json(createdOrder);

  } catch (error) {
    console.log('error in addOrderItems controller');
    next(error);
  }
};

export { addOrderItems };