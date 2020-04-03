import Router, { Request, Response, NextFunction } from 'express';
import { loginControler } from '../usecases/login';
import { registerController } from '../usecases/register';
import { Authentication } from '../../../shared/infra/server/middleware/authentication';

const router = Router();

router
  .post('/login', (req: Request, res: Response) => loginControler.executeImpl(req, res))
  .post('/register', (req: Request, res: Response) => {
    registerController.executeImpl(req, res);
  })
  .post('/logout', (req: Request, res: Response, next: NextFunction) => Authentication.unauthenticate(req, res, next));

export default router;
