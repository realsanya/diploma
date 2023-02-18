import express from 'express';
import { userController } from '../controllers/index.js';

const router = express.Router()

router.get('/users', (req, res) => {
  userController.getUsers().then(data => res.json(data));
});

router.get('/users/:id', (req, res) => {
  userController.getUser(req.params.id).then(data => res.json(data));
});

export default router