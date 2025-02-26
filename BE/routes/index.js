const express = require('express');
const router = express.Router();
const userRouter = require('./users/userRoute');
const authRouter = require('./auth/authRoute');

router.use('/users', userRouter);
router.use('/auth', authRouter);

module.exports = router;