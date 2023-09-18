import { ACT_FETCH_ARTICLES, ACT_FETCH_ARTICLE_LATEST, ACT_FETCH_ARTICLE_POPULAR, ACT_FETCH_POST_DETAIL, ACT_FETCH_RELATED_POST, ACT_INCREASE_COMMENT_COUNT } from "./actions";

const initState = {
    articlesLatest: [],
    articlePopular: [],
    articlePaging: {
        list: [],
        currentPage: 1
    },
    postDetail: null,
    relatedPostByAuthor: []
}

function reducer(postState = initState, action) {
    switch (action.type) {
        case ACT_INCREASE_COMMENT_COUNT:
            return {
                ...postState,
                postDetail: {
                    ...postState.postDetail,
                    commentCount: postState.postDetail.commentCount + 1 
                }
            }
        case ACT_FETCH_ARTICLE_LATEST:
            return {
                ...postState,
                articleLates: action.payload.posts
            }
        case ACT_FETCH_ARTICLE_POPULAR:
            return {
                ...postState,
                articlePopular: action.payload.posts
            }
        case ACT_FETCH_ARTICLES:
            return {
                ...postState,
                articlePaging: {
                    ...postState.articlePaging,
                    list: action.payload.currentPage === 1 ? action.payload.posts : [
                        ...postState.articlePaging.list,
                        ...action.payload.posts
                    ],
                    currentPage: action.payload.currentPage,
                    total: action.payload.total,
                    toalPages: action.payload.toalPages
                }
            }
        case ACT_FETCH_POST_DETAIL:
            return {
                ...postState,
                postDetail: action.payload.post
            }
        case ACT_FETCH_RELATED_POST:
            return {
                ...postState,
                relatedPostByAuthor: action.payload.posts
            }
        default:
            return postState;
    }
}

export default reducer