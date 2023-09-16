import './post-detail.css'
import PostDetailComments from "./PostDetailComments"
import PostDetailRichText from "./PostDetailRichText"
import PostDetailTags from "./PostDetailTags"



function PostDetailContent({ post }) {
  
  return (
    <div className="post-detail__content">
      <div className="thumbnail">
        <img src={post.thumbnail} alt={post.thumbnail} />
      </div>
      <div className="content-padding">
        <PostDetailRichText post={post} />

        <PostDetailTags post={post} />

        <PostDetailComments />
      </div>
    </div>
  )
}

export default PostDetailContent