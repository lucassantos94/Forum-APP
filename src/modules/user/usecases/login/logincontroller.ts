import { BaseControler } from '../../../../shared/infra/server/model/basecontroller';
import { Request, Response } from 'express';
import { loginSchema } from './loginschema';
import { Authentication } from '../../../../shared/infra/server/middleware/authentication';
import { Login } from './login';

export class LoginController extends BaseControler {
  #usecase: Login;

  constructor(usecase: Login) {
    super();
    this.#usecase = usecase;
  }

  async exec(req: Request, res: Response): Promise<Response<unknown>> {
    const body = req.body;
    const data = await loginSchema.validateAsync(body);
    const result = await this.#usecase.execute(data);
    const success = result[0];
    if (success) {
      const userData = result[1] as { id: string; email: string };
      await Authentication.authenticate(userData, res);
      return BaseControler.OK(res);
    } else return BaseControler.Unathorized(res);
  }
}
