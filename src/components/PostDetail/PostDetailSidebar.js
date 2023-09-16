import PostDetailAuthor from "./PostDetailAuthor"
import PostDetailRelatedPosts from "./PostDetailRelatedPosts"

function PostDetailSidebar({ post }) {

  return (
    <div className="post-detail__side">
      <PostDetailAuthor post={post} />
      <div className="spacing" />
      <PostDetailRelatedPosts />
    </div>
  )
}

export default PostDetailSidebar