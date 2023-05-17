const express = require('express');
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', auth, authController.logout);
router.patch('/update', auth, authController.updateUser);
router.get('/isloggedin', authController.isLoggedIn);
router.get('/info/:id', authController.getUserById);
router.get('/profile/', auth, authController.getUserByToken);
router.post('/verify-password', authController.verifyPassword)

module.exports = router;
