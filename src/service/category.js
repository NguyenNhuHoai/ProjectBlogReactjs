import api from './api'

export const categoryService = {
    getList({ page = 1, per_page = 100 } = {}) {
        return api.call().get('/wp/v2/categories', {
            params: {
                page,
                per_page,
                lang: 'vi'
            }
        })
    }
}

