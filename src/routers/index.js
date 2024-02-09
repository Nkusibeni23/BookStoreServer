import express from 'express';

import docrouter from '../documentation/index.doc';
import userRouter from './userRouter';
import authRouter from './authRouter';
import BookRouter from './BookRouter';
import OrderRouter from './OrderRouter';


const router = express.Router();

router.use('/docs', docrouter);
router.use('/users', userRouter);
router.use('/auth', authRouter);
router.use('/Book', BookRouter);
router.use('/Order', OrderRouter);



export default router;
