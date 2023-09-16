
import { mappingComment } from "../../helpers"
import commentService from "../../service/comment"

// Actions Type

export const ACT_FETCH_COMMENT_PARENT = 'ACT_FETCH_COMMENT_PARENT'

// Action creater
export function actFetchComment({ comments, total, toalPages, currentPage }) {
    return {
        type: ACT_FETCH_COMMENT_PARENT,
        payload: {
            comments,
            total,
            toalPages,
            currentPage
        }
    }
}



// Action Async

export function actFetchCommentAsync({
    perPage = 5,
    currentPage = 1,
    postId,
    parrentId = 0,
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
                parrentId,
            })
            const total = Number(response.headers['x-wp-total'])
            const toalPages = Number(response.headers['x-wp-totalpages'])
            const comments = response.data.map(mappingComment)
            console.log('comments', comments);
            dispatch(actFetchComment({ comments, total, toalPages, currentPage }))
        } catch (error) {

        }
    }
}