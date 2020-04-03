import { CommentPostController } from './commentpostcontroller';
import { CommentPost } from './commentpost';
import { UserRepo } from '../../../user/repo/impl/userrepo';
import { PostRepo } from '../../repo/impl/postrepo';
import userModel from '../../../../shared/infra/database/mongoose/model/user';
import postModel from '../../../../shared/infra/database/mongoose/model/post';

const userRepo = new UserRepo(userModel);
const postRepo = new PostRepo(postModel);
const commentPostUseCase = new CommentPost(userRepo, postRepo);
const commentPostController = new CommentPostController(commentPostUseCase);

export { commentPostController, commentPostUseCase };
