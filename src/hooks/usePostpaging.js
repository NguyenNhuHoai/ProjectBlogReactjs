import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { actFetchArticlesAsync } from "../store/post/actions"
import Button from "../components/shared/Button"



export function usePostPaging({
    extraParams = {}
} = {} ) {
    const dispatch = useDispatch()

    const {
        list: posts,
        currentPage,
        toal,
        toalPages
    } = useSelector(state => state.POST.articlePaging)

    const [loading, setLoading] = useState(false)

    const hasMorePost = currentPage < toalPages

    function handleLoadMore() {
        if (loading) {
            return
        }
        setLoading(true)
        dispatch(actFetchArticlesAsync({
            // perPage: 2,
            currentPage: currentPage + 1,
            ...extraParams
        })).then(() => {
            setLoading(false)
        })
    }

    function renderButtonLoadMore() {
        return hasMorePost &&
            <div className="text-center">
                <Button
                    type="primary"
                    size="large"
                    loading={loading}
                    onClick={handleLoadMore}
                >
                    Tải thêm
                </Button>
            </div>


    }
    return {
        posts,
        toal,
        renderButtonLoadMore
    }
}