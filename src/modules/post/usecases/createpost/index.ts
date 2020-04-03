import { CreatePost } from './createpost';
import { CreatePostController } from './createpostcontroller';
import { PostRepo } from '../../repo/impl/postrepo';
import { UserRepo } from '../../../user/repo/impl/userrepo';
import userModel from '../../../../shared/infra/database/mongoose/model/user';
import postModel from '../../../../shared/infra/database/mongoose/model/post';

const postRepo = new PostRepo(postModel);
const userRepo = new UserRepo(userModel);
const createPostUseCase = new CreatePost(postRepo, userRepo);
const createPostController = new CreatePostController(createPostUseCase);

export { createPostController, createPostUseCase };
