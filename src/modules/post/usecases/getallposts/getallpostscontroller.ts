import { BaseControler } from '../../../../shared/infra/server/model/basecontroller';
import { Request, Response } from 'express';
import { getAllPostsSchema } from './getallpostsschema';
import { GetAllPosts } from './getallposts';
export class GetAllPostsController extends BaseControler {
  #getAllPosts: GetAllPosts;
  constructor(getAllPosts: GetAllPosts) {
    super();
    this.#getAllPosts = getAllPosts;
  }

  async exec(req: Request, res: Response): Promise<Response<unknown>> {
    const userId = req.user?.id as string;
    const page = await getAllPostsSchema.validateAsync(req.params);
    const result = await this.#getAllPosts.execute(userId, page);
    if (result) {
      return BaseControler.sendJson(200, res, result);
    }
    return BaseControler.noContent(res);
  }
}
