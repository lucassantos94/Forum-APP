import { UserRepo } from '../../../user/repo/impl/userrepo';
import { PostRepo } from '../../repo/impl/postrepo';
import userModel from '../../../../shared/infra/database/mongoose/model/user';
import postModel from '../../../../shared/infra/database/mongoose/model/post';
import { GetAllPosts } from './getallposts';
import { GetAllPostsController } from './getallpostscontroller';

const userRepo = new UserRepo(userModel);
const postRepo = new PostRepo(postModel);

const getAllPostsUseCase = new GetAllPosts(userRepo, postRepo);
const getAllPostscontroller = new GetAllPostsController(getAllPostsUseCase);

export { getAllPostscontroller, getAllPostsUseCase };
