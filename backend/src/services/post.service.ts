import { Post } from '../models/Post.model';
import { IPost } from '../types/post.type';

export default class TodoService {
  async findAll() {
    const posts = await Post.find();
    return posts;
  }

  async create(post: IPost) {
    const newPost = await Post.create(post);
    return newPost;
  }
}
