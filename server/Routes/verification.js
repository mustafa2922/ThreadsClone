import express from 'express';
import Verifier from '../controlers/verifier.js';

const router = express.Router();

router.get('/:token',Verifier)

export default router;