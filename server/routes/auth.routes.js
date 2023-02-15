import express from 'express';

import { authService } from '../services/index.js';

const router = express.Router()

router.post('/register', authService.signup);

router.post('/login', authService.login);

export default router;