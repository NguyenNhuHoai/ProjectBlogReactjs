import React, { useState } from 'react'
import CommentAction from './CommentAction'
import CommentForm from './CommentForm'
import CommentsSection from './CommentsSection'
import { useCommentPaging } from '../../hooks/useCommentPaging'

const CommentItem = (props) => {
    const [isShowForm, setIsShowForm] = useState(false)
    const isThisParent = props.parentId === 0
    const { comments: replycomment,
        handleLoadMore,
        loading,
      
        exclude
    } = useCommentPaging({
        parentId: props.comment.id
    })

    function handleOnRepLyClick() {
        setIsShowForm(!isShowForm)
    }


    return (
        <li className="item">
            <CommentsSection
                onRepLyClick={handleOnRepLyClick}
                comment={props.comment}
                parentId={props.comment.id}
            />
            {/* Reply Comments */}
            {
                isThisParent && replycomment?.length > 0 &&
                (
                    <ul className="comments">
                        {
                            replycomment.map(replyCmtItem => {
                                return <CommentItem key={replyCmtItem.id} parentId={props.comment.id} comment={replyCmtItem} />
                            })
                        }
                    </ul>
                )
            }
            {/* Reply form */}
            {
                isThisParent && props.comment.replyCount > 0 && (
                    <CommentAction
                        loading={loading}
                        count={props.comment.replyCount - replycomment.length + exclude.length}
                        onClick={handleLoadMore}
                    />
                )
            }
            {
                isThisParent && isShowForm && <CommentForm />
            }
        </li>
    )
}

export default CommentItem