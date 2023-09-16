
import api from './api'

const postService = {
    getList(params) {
        return api.call().get('/wp/v2/posts', {
            params: {
                ...params,
                lang: 'vi'
            }
        })
    },
    getArticleLatest() {
        return postService.getList({
            page: 1,
            per_page: 3
        })
    },
    getAriclePopular() {
        return postService.getList({
            page: 1,
            per_page: 3,
            orderby: 'post_views'
        })
    },
    getArticles({
        currentPage = 1,
        perPage = 2,
        ...restParams
    }) {
        return postService.getList({
            page: currentPage,
            per_page: perPage,
            ...restParams
        })
    },
    getDetail(slug) {
        return postService.getList({
            slug
        })
    }
}

export default postService