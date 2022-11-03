import { useAppDispatch, useAppSelector } from "../app/hooks"
import { createPostThunk } from '../features/posts/postReducer'
import { IFormData } from "../types";

export const useCreatePost = () => {
  const dispatch = useAppDispatch();
  const { posting, errorPost } = useAppSelector(state => state.posts);

  const createPost = async (data: IFormData) => {
    console.log(data)
    await dispatch(createPostThunk(data));
  }
  return { createPost, posting, errorPost }
}