import { BaseControler } from '../../../../shared/infra/server/model/basecontroller';
import { Request, Response } from 'express';
import { createPostSchema } from './createpostschema';
import { CreatePost } from './createpost';

export class CreatePostController extends BaseControler {
  #usecase: CreatePost;
  constructor(usecase: CreatePost) {
    super();
    this.#usecase = usecase;
  }

  async exec(req: Request, res: Response): Promise<Response<unknown>> {
    const userId = req.user?.id as string;
    const { text } = await createPostSchema.validateAsync(req.body);
    const postCreated = await this.#usecase.execute({ userId, text });
    if (postCreated) return BaseControler.noContent(res);
    return BaseControler.badRequest(res);
  }
}
