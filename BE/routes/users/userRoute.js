const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  getUserById,
  deleteUser,
  updateUser,
  getProfile,
} = require('../../controllers/users/userController');
const { authenticate, authorize } = require('../../middlewares/auth');

router.get('/', authenticate, authorize('admin'), getAllUsers);
router.get('/:id', authenticate, getUserById);
router.delete('/:id', authenticate, authorize('admin'), deleteUser);
router.put('/:id', authenticate, authorize('admin'), updateUser);
router.get('/get/profile', authenticate, getProfile);

module.exports = router;