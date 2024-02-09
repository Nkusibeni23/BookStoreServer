import express from 'express';
import {
  addCustomer,
} from '../controllers/userController';
import { protect } from '../middlewares/protect';
const router = express.Router();

router.post('/signup', addCustomer);

export default router;
