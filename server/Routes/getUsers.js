import express from 'express';
import GetUsers from '../controlers/getUsers.js';

const router = express.Router();

router.get('/:userID',GetUsers)

export default router;