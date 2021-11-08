import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';


// Auth user & get token
// POST /api/users/login
// Public 

const authUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });

    if (user && await user.matchPassword(password)) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      })
    } else {
      res.status(401);
      throw new Error('Invalid email or password');
    }
  } catch (err) {
    console.log('in error', err);
  }
};




// GET user profile
// GET /api/users/profile
// Private

const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    })
  } else {
    res.status(404);
    return next();
  }
};




export { authUser, getUserProfile };