import { LoginController } from './logincontroller';
import { Login } from './login';
import { UserRepo } from '../../repo/impl/userrepo';
import user from '../../../../shared/infra/database/mongoose/model/user';

const userRepo = new UserRepo(user);
const loginUseCase = new Login(userRepo);

const loginControler = new LoginController(loginUseCase);

export { loginControler, loginUseCase };
