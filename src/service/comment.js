import api from './api'


const commentService = {
    getList({
        perPage = 5,
        currentPage = 1,
        postId,
        parrentId,
        ...restParams
    } = {}) {
        return api.call().get('/wp/v2/comments', {
            params: {
                per_page: perPage,
                page: currentPage,
                post: postId,
                parent: parrentId,
                lang: "vi",
                ...restParams
            }
        })
    }
}

export default commentService