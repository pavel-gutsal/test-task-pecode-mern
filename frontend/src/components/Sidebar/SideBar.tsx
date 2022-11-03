import React from 'react';
import { RotatingLines } from  'react-loader-spinner';
import { IPost } from '../../types';
import { PostElement } from '../PostElement';
import './SideBar.scss';


type Props = {
  posts: IPost[];
  download: "idle" | "failed" | "pending" | "fullfilled";
  errorDownload: string | null
}

export const SideBar: React.FC<Props> = ({ 
  posts,
  download,
  errorDownload,
 }) => {
  return (
    <div className="SideBar">
      {
         posts && posts.length > 0 && (
          <div className='SideBar__PostList'>
            {posts.map(post => (
              <PostElement post={post} key={post._id} small={true}/>
            ))}
          </div>
        )
      }
      {
        download === 'pending' && (
          <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="46"
            visible={true}
          />
        )
      }
      { (<p className='PostArea__errorMessage'>{errorDownload}</p>) }
    </div>
  );
};
