import React, { useEffect } from 'react';
import { useDownloadPosts } from '../../customHooks/useDownloadPost.hook';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Form } from '../Form';
import { PostArea } from '../PostArea';
import { SideBar } from '../Sidebar';
import { sortPosts } from '../../features/posts/postReducer';
import './DashBoard.scss';

export const Dashboard = () => {
  const { downloadPosts, download, errorDownload } =  useDownloadPosts();
  const dispatch = useAppDispatch();
  const { posts, posting } = useAppSelector(state => state.posts);

  console.log(posts, download, errorDownload);

  useEffect(() => {
    downloadPosts();
  }, []);

  useEffect(() => {
    dispatch(sortPosts());
  }, [dispatch,download, posting]);

  return (
    <section className="DashBoard">
      <div className="DashBoard__container">
        <Form />
        <SideBar
          posts={posts.filter((_, index) => index < 5)}
          download={download}
          errorDownload={errorDownload}
        />
        <PostArea
          posts={posts}
          download={download}
          errorDownload={errorDownload}
        />
      </div>
    </section>
  )
}
