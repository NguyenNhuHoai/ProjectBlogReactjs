import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom/cjs/react-router-dom'
import { genUserLink } from '../../helpers'
import { useState } from 'react'
import Button from '../shared/Button'
import { actPostNewCommentAsync } from '../../store/comment/actions'

const CommentForm = ({ parentId }) => {

    const dispatch = useDispatch()
    const [content, setContent] = useState('')
    const currentUser = useSelector(state => state.AUTH.currentUser)

    const [loading, setLoading] = useState(false)

    const postId = useSelector(state => state.POST?.postDetail?.id)

    const isThisParent = parentId === 0
    const placehoder = isThisParent ? 'Viết bình luận' : 'Viết phản hồi'
    const bntLable = isThisParent ? 'Bình luận' : 'Phản hồi'

    function handleChange(evt) {
        setContent(evt.target.value)
    }

    function handleSubmitCommnet() {
        if (loading) return
        setLoading(true)

        dispatch(actPostNewCommentAsync({
            authorId: currentUser.id,
            parentId: parentId,
            content: content,
            postId: postId
        })).then(res => {
            if(res.ok){
                setContent('')
            }
            setLoading(false)
        })
    }

    if (!currentUser && isThisParent) {
        return <p>Bạn phải <Link to='/login'>đăng nhập</Link> để bình luận bài viết này</p>
    }

    return (
        <div className="comments__form">
            <div className="comments__form--control">
                <div className="comments__section--avatar">
                    <Link to={genUserLink(currentUser.id)}>
                        <img src={currentUser.avatar} alt={currentUser.nickname} />
                    </Link>
                </div>
                <textarea placeholder={placehoder} onChange={handleChange} value={content} />
            </div>
            <div className="text-right">
                <Button onClick={handleSubmitCommnet} loading={loading}>{bntLable}</Button>

            </div>
        </div>
    )
}

export default CommentForm