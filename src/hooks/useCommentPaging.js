import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { actFetchCommentAsync } from "../store/comment/actions"

const fnPostIdSelector = state => state.POST?.postDetail?.id
const fnParentPagingSelector = state => state.COMMENT.parentPaging

export function useCommentPaging({
    extraParams = {}
} = {}) {
    const dispatch = useDispatch()
    const postId = useSelector(fnPostIdSelector)
    const {
        list: comments,
        currentPage,
        total,
        toalPages
    } = useSelector(fnParentPagingSelector)

    const [loading, setLoading] = useState(false)

    const hasMoreComment = currentPage < toalPages

    function handleLoadMore() {
        if (loading) {
            return
        }
        setLoading(true)
        dispatch(actFetchCommentAsync({
            // perPage: 2,
            currentPage: currentPage + 1,
            postId: postId,
            parent: 0,
            ...extraParams
        })).then(() => {
            setLoading(false)
        })
    }


    return {
        comments,
        total,
        handleLoadMore,
        hasMoreComment,
        toalPages,
        loading
    }
}