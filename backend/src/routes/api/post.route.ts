import { Router } from 'express';
import postController from '../../controllers/post.controller';
import { Post } from '../../models/Post.model';
import {
  tryCatchMiddleWare,
  validateDto,
} from '../../middlewares';
import { postValidation } from '../../dto/validate.schema';

const postRouter: Router = Router();

// @route   GET api/todos
// @desc    get all posts from database
//@access Public
postRouter.get(
  '',
  tryCatchMiddleWare(postController.getAllPosts.bind(postController))
);

// @route   POST api/todos
// @desc    create new post in database
// @access  Public
postRouter.post(
  '',
  validateDto(postValidation),
  tryCatchMiddleWare(postController.createPost.bind(postController)),
);

export default postRouter;