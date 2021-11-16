import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { addOrderItems } from '../controllers/orderController.js';

const router = express.Router();

router.post('/', protect, addOrderItems);

export default router;


// const protect = async (req, res, next) => {
//   let token;
//   if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
//     try {
//       token = req.headers.authorization.split(' ')[1];
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       req.user = await User.findById(decoded.id).select('-password');
//       return next();
//     } catch (err) {
//       res.status(401);
//       return next(err);
//     }
//   }

//   if (!token) {
//     res.status(401);
//     next({ message: 'Not authorized, no token' });
//   }
// };