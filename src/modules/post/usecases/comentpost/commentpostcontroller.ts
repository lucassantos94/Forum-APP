import { BaseControler } from '../../../../shared/infra/server/model/basecontroller';
import { Request, Response } from 'express';
import { commentPostSchema } from './commentpostschema';
import { CommentPost } from './commentpost';

export class CommentPostController extends BaseControler {
  #commentPost: CommentPost;
  constructor(commentPost: CommentPost) {
    super();
    this.#commentPost = commentPost;
  }

  async exec(req: Request, res: Response): Promise<Response<unknown>> {
    const userId = req.user?.id as string;
    const data = await commentPostSchema.validateAsync(req.body);
    const success = this.#commentPost.execute({ ...data, userId });
    if (success) return BaseControler.noContent(res);
    return BaseControler.badRequest(res);
  }
}
