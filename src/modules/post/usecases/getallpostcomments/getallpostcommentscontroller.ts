import { BaseControler } from '../../../../shared/infra/server/model/basecontroller';
import { Request, Response } from 'express';
import { getAllPostCommentsSchema } from './getallpostcommentsschema';
import { GetAllPostComments } from './getallpostcomments';
export class GetAllPostCommentsController extends BaseControler {
  #getAllPostComments: GetAllPostComments;
  constructor(getAllPostComments: GetAllPostComments) {
    super();
    this.#getAllPostComments = getAllPostComments;
  }

  async exec(req: Request, res: Response): Promise<Response<unknown>> {
    const userId = req.user?.id as string;
    const { postId, page } = await getAllPostCommentsSchema.validateAsync(req.params);
    const result = await this.#getAllPostComments.execute(postId, userId, page);
    console.log('aqui', result);
    if (result) {
      return BaseControler.sendJson(200, res, result);
    }
    return BaseControler.noContent(res);
  }
}
