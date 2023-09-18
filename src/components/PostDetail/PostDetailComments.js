import { useCommentPaging } from '../../hooks/useCommentPaging'
import CommentAction from './CommentAction'
import CommentForm from './CommentForm'
import CommentItem from './CommentItem'
import './comments.css'


const handleMapParentComments = commnet => (
  <CommentItem
    key={commnet.id}
    parentId={commnet.parentId}
    comment={commnet}
  />
)

function PostDetailComments() {
  const { comments, total, handleLoadMore, loading } = useCommentPaging()

  return (
    <div className="post-detail__comments">
      <CommentForm parentId={0} />
      <p>{total} Bình luận</p>
      {
        comments.length > 0 && (
          <ul className="comments">
            {
              comments.map(handleMapParentComments)
            }
          </ul>
        )
      }
      <CommentAction
        count={total - comments.length}
        parent={true}
        spacingTop
        loading={loading}
        onClick={handleLoadMore} />
    </div>
  )
}

export default PostDetailComments