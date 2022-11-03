import { useAppDispatch, useAppSelector } from "../app/hooks"
import { downloadPostsThunk } from '../features/posts/postReducer'

export const useDownloadPosts = () => {
  const dispatch = useAppDispatch();
  const { download, errorDownload } = useAppSelector(state => state.posts);

  const downloadPosts = async () => {
    await dispatch(downloadPostsThunk());
  }

  return { downloadPosts, download, errorDownload }
}