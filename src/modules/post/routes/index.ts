import { Router, Request, Response, NextFunction } from 'express';
import { Authentication } from '../../../shared/infra/server/middleware/authentication';
import { createPostController } from '../../post/usecases/createpost';
import { commentPostController } from '../../post/usecases/comentpost';
import { getAllPostscontroller } from '../../post/usecases/getallposts';
import { getAllPostCommentsController } from '../../post/usecases/getallpostcomments';

const router = Router();
router
  .post(
    '/',
    async (req: Request, res: Response, next: NextFunction) => await Authentication.verifyAuthenticated(req, res, next),
    (req: Request, res: Response) => {
      createPostController.executeImpl(req, res);
    },
  )
  .post(
    '/comment/',
    async (req: Request, res: Response, next: NextFunction) => await Authentication.verifyAuthenticated(req, res, next),
    (req: Request, res: Response) => {
      commentPostController.executeImpl(req, res);
    },
  )
  .get(
    '/:page',
    async (req: Request, res: Response, next: NextFunction) => await Authentication.verifyAuthenticated(req, res, next),
    (req: Request, res: Response) => {
      getAllPostscontroller.executeImpl(req, res);
    },
  )
  .get(
    '/comment/:postId/:page',
    async (req: Request, res: Response, next: NextFunction) => await Authentication.verifyAuthenticated(req, res, next),
    (req: Request, res: Response) => {
      getAllPostCommentsController.executeImpl(req, res);
    },
  );

export default router;
