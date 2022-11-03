import { Request } from 'express';
import PostService from '../services/post.service'
import { IPost } from '../types/post.type';

export class PostController {
  constructor(private postService: PostService) {}

  async getAllPosts(req: Request) {
    const post = await this.postService.findAll();
    return post;
  }

  async createPost (req: Request) {
    const post: IPost = req.body;
    const newPost = await this.postService.create(post);
    return newPost;
  }
}

const postController = new PostController(new PostService());
export default postController;
