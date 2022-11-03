import { HttpSerivce } from './http.servicies';
import { IFormData } from '../types';

class PostService extends HttpSerivce {
  download = async () => {
    return this.get({ url: 'post' });
  };

  createTodo = async (post: IFormData) => {
    return this.create({ url: 'post' }, post);
  }
}

export const postService = new PostService();
