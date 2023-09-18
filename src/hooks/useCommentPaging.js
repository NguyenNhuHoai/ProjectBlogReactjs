import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { actFetchCommentAsync } from "../store/comment/actions"
import { getDefauldPaging } from "../helpers"

const fnPostIdSelector = state => state.POST?.postDetail?.id
const fnParentPagingSelector = state => state.COMMENT.parentPaging
const fnChildPagingSlector = (state, parentId) => state.COMMENT.hashChildPaging[parentId]

export function useCommentPaging({
    parentId = 0,
} = {}) {
    const dispatch = useDispatch()
    const postId = useSelector(fnPostIdSelector)
    const {
        list: comments,
        currentPage,
        total: _total,
        toalPages,
        exclude
    } = useSelector(state => {
        if (parentId === 0) {
            return fnParentPagingSelector(state)
        }
        return fnChildPagingSlector(state, parentId) || getDefauldPaging()
    })
    const [loading, setLoading] = useState(false)

    const hasMoreComment = currentPage < toalPages

    function handleLoadMore() {
        if (loading) {
            return
        }

        setLoading(true)
        const params = {
            currentPage: currentPage + 1,
            postId,
            parentId,
            exclude
        }

        dispatch(actFetchCommentAsync(params)).then(() => {
            setLoading(false)
        })
    }


    return {
        comments,
        total: _total + (exclude?.length || 0),
        handleLoadMore,
        hasMoreComment,
        toalPages,
        loading,
        exclude

    }
}