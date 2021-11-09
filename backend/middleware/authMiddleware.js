import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

// remember this is a middleware function (token validation):

const protect = async (req, res, next) => {
  console.log('in protect');

  let token;
  console.log(req.headers.authorization);
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {

    console.log('token found');

    try {
      token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('decoded (jwt.verify) ', decoded);

      req.user = await User.findById(decoded.id).select('-password');

      return next();
    } catch (err) {
      console.error(err);
      res.status(401);
      return next(err);
    }
  }
  console.log('token', token);

  if (!token) {
    res.status(401);
    next({ message: 'Not authorized, no token' });
  }
};

export { protect };


// if () {}
// if () {}
// if () {}
// if () {}