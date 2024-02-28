import express from 'express';
import RegisterUser from '../controlers/registerUser.js';
import LoginUser from '../controlers/loginUser.js';
import Follower from '../controlers/followUser.js';
import Unfollower from '../controlers/unfollowUser.js';

const router = express.Router();

router.post('/register',RegisterUser);
router.post('/login',LoginUser);
router.post('/follow',Follower);
router.post('/unfollow',Unfollower);

export default router;