import { mappingPostData, mappingPostDetailData } from "../../helpers"
import postService from "../../service/post"
import { actFetchCommentAsync } from "../comment/actions"

// ACTION TYPE

export const ACT_FETCH_ARTICLE_LATEST = 'ACT_FETCH_ARTICLE_LATEST'
export const ACT_FETCH_ARTICLE_POPULAR = 'ACT_FETCH_ARTICLE_POPULAR'
export const ACT_FETCH_ARTICLES = 'ACT_FETCH_ARTICLES'
export const ACT_FETCH_POST_DETAIL = 'ACT_FETCH_ARTICLE_POST_DETAIL'
export const ACT_FETCH_RELATED_POST = 'ACT_FETCH_RELATED_POST'


// ACT CREATER

export function actFetchArticleLatest(posts) {
    return {
        type: ACT_FETCH_ARTICLE_LATEST,
        payload: {
            posts
        }
    }
}

export function actFetchArticlePopular(posts) {
    return {
        type: ACT_FETCH_ARTICLE_POPULAR,
        payload: {
            posts
        }
    }
}

export function actFetchArticleGeneral({ posts, currentPage, total, toalPages }) {
    return {
        type: ACT_FETCH_ARTICLES,
        payload: {
            posts,
            currentPage,
            total,
            toalPages
        }
    }
}

// PostDetail
export function actFetchPostDetail(post) {
    return {
        type: ACT_FETCH_POST_DETAIL,
        payload: {
            post
        }
    }
}

export function actFetchRelatedPost(posts) {
    return {
        type: ACT_FETCH_RELATED_POST,
        payload: {
            posts
        }
    }
}

// ACT ASYNC

export function actFetchArticleLatestAsync() {
    return async (dispatch) => {
        try {
            const response = await postService.getArticleLatest()
            const posts = response.data.map(mappingPostData)
            dispatch(actFetchArticleLatest(posts))
        } catch (error) {
            // TODO
        }
    }
}

export function actFetchArticlePopularAsync() {
    return async (dispatch) => {
        try {
            const response = await postService.getAriclePopular();
            const posts = response.data.map(mappingPostData)
            dispatch(actFetchArticlePopular(posts))
        } catch (error) {

        }
    }
}

export function actFetchArticlesAsync({ currentPage = 1, perPage = 2, ...restParams } = {}) {
    return async (dispatch) => {
        try {
            const response = await postService.getArticles({ currentPage, perPage, ...restParams })
            const total = Number(response.headers['x-wp-total'])
            const toalPages = Number(response.headers['x-wp-totalpages'])
            const posts = response.data.map(mappingPostData);

            dispatch(actFetchArticleGeneral({ posts, currentPage, total, toalPages }))
        } catch (error) {

        }
    }
}


export function actFetchArticlePostDetailAsync(slug) {
    return async dispatch => {
        try {
            const response = await postService.getDetail(slug)
            const post = response.data[0]
            if (!post) {
                throw new Error('Post Not Found')
            }
            const postId = post.id
            const authorId = post.author

            dispatch(actFetchPostDetail(mappingPostDetailData(post)))
            dispatch(actFetchCommentAsync({ postId }))
            dispatch(actFetchRelatedPostAsync({ authorId, postId }))
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

export function actFetchRelatedPostAsync({ authorId, postId }) {
    return async (dispatch) => {
        try {
            const response = await postService.getList({
                author: authorId,
                exclude: postId,
                per_page: 3
            })
            const posts = response.data.map(post => mappingPostData(post))
            dispatch(actFetchRelatedPost(posts))
        } catch (error) {

        }
    }
}