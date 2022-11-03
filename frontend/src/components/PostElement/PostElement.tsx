import classNames from 'classnames';
import { IPost } from '../../types';
import './PostElement.scss';

type Props = {
  post: IPost;
  small?: boolean;
}

const capitalize = (str: string) => {
  return str.slice(0,1).toUpperCase() + str.slice(1);
}

export const PostElement: React.FC<Props> = ({ post, small }) => {

  return (
    <div className={classNames('PostElement', {small})}>
      <div className={classNames('PostElement__imgContainer', {small})}>
        <img
          className={classNames('PostElement__img', {small})}
          src={post.userAvatar}
          alt="user Avatar"
        />
      </div>
      <div className={classNames('PostElement__descr', {small})}>
        <h3 className="PostElement__userName">{capitalize(post.userName)}</h3>
        <p className={classNames('PostElement__text', {small})}>{post.text}</p>
      </div>
    </div>
  )
}