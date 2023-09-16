
import {formatedDate} from '../../helpers/index'
function PostDetailHead({ post }) {


  const {dateFormated} = formatedDate(post.createDate)

  return (
    <div className="post-detail__head">
      <div className="tcl-container">
        <h1 className="post-detail__title">{!post.title ? 'Title is having an error and cannot be displayed' : post.title}</h1>
        <ul className="post-detail__info">
          <li className="item author">
            By <a href="/"><strong>{post.author.nickname}</strong></a>
          </li>
          <li className="item date">
            {dateFormated}
          </li>
          <li className="item views">
            {post.viewCount} <i className="icons ion-ios-eye" />
          </li>
          <li className="item comments">
            {post.commentCount} <i className="icons ion-ios-chatbubble" />
          </li>
        </ul>
      </div>
    </div>
  )
}

export default PostDetailHead