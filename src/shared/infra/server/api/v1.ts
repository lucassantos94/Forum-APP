import { Router } from 'express';
import postRouter from '../../../../modules/post/routes';
import userRouter from '../../../../modules/user/routes';
const apiV1 = Router();

apiV1.use('/post', postRouter).use('/user', userRouter);

export default apiV1;
