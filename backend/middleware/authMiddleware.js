import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

// to validate the token



// remember this is a middleware function
const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    console.log('token found');
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('decoded', decoded);

      req.user = await User.findById(decoded.id).select('-password');
      return next()
    } catch (err) {
      console.error(err);
      res.status(401);
      return next(err);
      // throw new Error('Not authorized, token failed');
    }
  }
  console.log('token', token);
  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token')
  }
  return next();
};



export { protect };


