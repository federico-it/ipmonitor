const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Check if user with the same email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password and create user
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    // Create JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

    res.status(201).json({ message: 'User created', token });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'User Not Found' });
    }

    // Check if password is correct
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Create JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    
    res.status(200).json({ message: 'Logged in', token, _id:user._id });
  } catch (error) {
    next(error);
  }
};

exports.logout = (req, res, next) => {
  try {
    res.clearCookie('jwt');
    res.status(200).json({ message: 'Logged out' });
  } catch (error) {
    next(error);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const userId = req.user._id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (name) {
      user.name = name;
    }

    if (email) {
      user.email = email;
    }

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    await user.save();

    res.status(200).json({ message: 'User updated', user });
  } catch (error) {
    next(error);
  }
};

const getToken = (req) => {
  // Try to get token from cookie
  let token = req.cookies.jwt;

  // If token is not present in cookie, try to get it from header
  if (!token && req.headers.authorization) {
    const authHeader = req.headers.authorization;
    token = authHeader.split(' ')[1];
  }

  return token;
};

exports.isLoggedIn = async (req, res, next) => {
  try {
    const token = getToken(req);

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ isLoggedIn: true, user });
  } catch (error) {
    next(error);
  }
};

exports.getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId, '_id name email');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ _id:user._id, name: user.name, email: user.email });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong', error });
  }
};

exports.verifyPassword = async (req, res, next) => {
  try {
    const { password } = req.body;
    const token = getToken(req)

    // Verifica se la password e il token sono presenti
    if (!password || !token) {
      return res.status(400).json({ message: 'Missing password or token' });
    }

    // Decodifica il token JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Trova l'utente corrispondente all'ID nel token
    const user = await User.findById(decoded.userId);

    // Verifica se l'utente esiste
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Verifica se la password è corretta
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    res.status(200).json({ isPasswordCorrect });
  } catch (error) {
    next(error);
  }
};



exports.getUserByToken = async (req, res) => {
  try {
    const token = getToken(req);

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ _id:user._id, name: user.name, email: user.email });
  } catch (error) {
    next(error);
  }
};


