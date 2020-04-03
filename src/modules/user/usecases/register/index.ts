import { Register } from './register';
import { RegisterController } from './registercontroller';
import { UserRepo } from '../../repo/impl/userrepo';
import userModel from '../../../../shared/infra/database/mongoose/model/user';

const userRepo = new UserRepo(userModel);
const register = new Register(userRepo);
const registerController = new RegisterController(register);

export { register, registerController };
