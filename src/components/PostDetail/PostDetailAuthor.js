import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import { genUserLink } from '../../helpers'
import './post-author.css'
import { AVATAR } from '../../constants'

function PostDetailAuthor({ post }) {
  const authorLink = genUserLink(post.authorId)
  return (
    <div className="post-author">
      <div className="post-author__bg-avatar">
        <Link to={authorLink} className="post-author__avatar">
          <img src={post.author.avatar ? post.author.avatar : AVATAR} alt="" />
        </Link>
      </div>
      <div className="post-author__nickname">
        <Link to={authorLink}>{post.author.nickname}</Link>
      </div>
      <p className="post-author__desc">{post.author.description ? post.author.description : 'No description'}</p>
    </div>

  )
}

export default PostDetailAuthor