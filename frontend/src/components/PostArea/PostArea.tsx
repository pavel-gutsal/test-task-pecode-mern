import React from 'react';
import { RotatingLines } from  'react-loader-spinner';
import { PostElement } from '../PostElement';
import { IPost } from '../../types';
import './PostArea.scss';

type Props = {
  posts: IPost[];
  download: "idle" | "failed" | "pending" | "fullfilled";
  errorDownload: string | null
}

export const PostArea: React.FC<Props> = ({
  posts,
  download,
  errorDownload,
}) => {
  return (
    <div className="PostArea">
      <h3 className="PostArea__count">Announcement: {posts.length}</h3>
      <div className='PostArea__container'>
        {
          posts && posts.length > 0 && (
            posts.map(post => (
              <PostElement key={post._id} post={post} />
            ))
          )
        }
        {
          download === 'pending' && (
            <RotatingLines
              strokeColor="grey"
              strokeWidth="5"
              animationDuration="0.75"
              width="70"
              visible={true}
            />
          )
        }
        { (<p className='PostArea__errorMessage'>{errorDownload}</p>) }
      </div>
    </div>
  );
};
