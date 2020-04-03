import { GetAllPostComments } from './getallpostcomments';
import { GetAllPostCommentsController } from './getallpostcommentscontroller';
import { UserRepo } from '../../../user/repo/impl/userrepo';
import { PostRepo } from '../../repo/impl/postrepo';
import userModel from '../../../../shared/infra/database/mongoose/model/user';
import postModel from '../../../../shared/infra/database/mongoose/model/post';

const userRepo = new UserRepo(userModel);
const postRepo = new PostRepo(postModel);

const getAllPostCommentsUseCase = new GetAllPostComments(userRepo, postRepo);
const getAllPostCommentsController = new GetAllPostCommentsController(getAllPostCommentsUseCase);

export { getAllPostCommentsUseCase, getAllPostCommentsController };
