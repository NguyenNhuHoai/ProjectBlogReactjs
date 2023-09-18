
import { mappingComment } from "../../helpers"
import commentService from "../../service/comment"
import { actIncreaseComnetCount } from "../post/actions"

// Actions Type

export const ACT_FETCH_COMMENT_PARENT = 'ACT_FETCH_COMMENT_PARENT'
export const ACT_FETCH_CHILD_PAGING = 'ACT_FETCH_CHILD_PAGING'
export const ACT_FETCH_CHILD_REPLY = 'ACT_FETCH_CHILD_REPLY'
export const ACT_NEW_PARENT_COMMENT = 'ACT_NEW_PARENT_COMMENT'
export const ACT_NEW_REPLY_COMMENT = 'ACT_NEW_REPLY_COMMENT'



// Action creater
export function actFetchComment({ comments, total, toalPages, currentPage, parentId }) {
    return {
        type: parentId === 0 ? ACT_FETCH_COMMENT_PARENT : ACT_FETCH_CHILD_REPLY,
        payload: {
            comments,
            total,
            toalPages,
            currentPage,
            parentId
        }
    }
}

export function actChildPaging(comments) {
    return {
        type: ACT_FETCH_CHILD_PAGING,
        payload: {
            comments
        }
    }
}

export function actPostNewComment(comment) {
    return {
        type: comment.parentId === 0 ? ACT_NEW_PARENT_COMMENT : ACT_NEW_REPLY_COMMENT,
        payload: {
            comment
        }
    }
}


// Action Async

export function actFetchCommentAsync({
    perPage = 2,
    currentPage = 1,
    postId,
    parentId = 0,
    exclude = []
}) {
    return async (dispatch) => {
        try {
            if (!postId) {
                throw new Error('Invalid postId')
            }
            const response = await commentService.getList({
                perPage,
                currentPage,
                postId,
                parentId,
                exclude
            })

            const total = Number(response.headers['x-wp-total'])
            const toalPages = Number(response.headers['x-wp-totalpages'])
            const comments = response.data.map(mappingComment)

            if (parentId === 0) {
                dispatch(actChildPaging(comments))
            }

            dispatch(actFetchComment({ comments, total, toalPages, currentPage, parentId }))
            dispatch(actIncreaseComnetCount())
            return {
                ok: true
            }
        } catch (error) {
            return {
                ok: false
            }
        }
    }
}

export function actPostNewCommentAsync({
    authorId,
    content,
    postId,
    parentId = 0
}) {
    return async dispatch => {
        try {
            if (!authorId || !content || !postId) {
                throw new Error('Invalid Data')
            }
            const response = await commentService.createOne({
                authorId,
                content,
                postId,
                parentId
            })
            const comment = mappingComment(response.data)
            dispatch(actPostNewComment(comment))
        } catch (error) {

        }
    }
}