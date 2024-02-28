import express from 'express';
import user from './user.js';
import verification from './verification.js';
import getUsers from './getUsers.js'; 

const router = express.Router();

router.use('/user',user);
router.use('/verify',verification);
router.use('/getUsers',getUsers);

export default router;