import { BaseControler } from '../../../../shared/infra/server/model/basecontroller';
import { Request, Response } from 'express';
import { Register } from './register';
import { registerSchema } from './registerschema';

export class RegisterController extends BaseControler {
  #register: Register;
  constructor(register: Register) {
    super();
    this.#register = register;
  }

  async exec(req: Request, res: Response): Promise<Response<unknown>> {
    const data = await registerSchema.validateAsync(req.body);
    const result = await this.#register.execute(data);
    if (result) {
      return BaseControler.sendJson(201, res);
    } else {
      return BaseControler.sendJson(409, res);
    }
  }
}
