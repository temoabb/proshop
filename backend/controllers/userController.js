import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';


// Auth user & get token
// POST /api/users/login
// Public 

const authUser = async (req, res, next) => {
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
    next(err);
  }
};


// POST register user
// GET /api/users
// public

const registerUser = async (req, res, next) => {
  console.log('req.body', req.body);

  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      next({ message: 'Bad request! User already exists with this email!' });
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id)
      })
    } else {
      res.status(400);
      next({ message: 'Invalid user data!' });
    }
  } catch (error) {
    next(error)
  }
};


// GET user profile
// GET /api/users/profile
// Private (need to send token)

const getUserProfile = async (req, res, next) => {
  console.log(req.user);
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


// Update user profile
// GET Put /api/users/profile
// Private (need to send token)

const updateUserProfile = async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    })

  } else {
    res.status(404);
    return next();
  }
};





export { authUser, getUserProfile, registerUser, updateUserProfile };