import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'

import MainTitle from '../components/shared/MainTitle'
import ArticleItem from '../components/ArticleItem'
import PageNotFound from '../components/PageNotFound/PageNotFound'
import IconLoading from '../components/shared/IconLoading'

import { actFetchArticlesAsync } from '../store/post/actions'
import { usePostPaging } from '../hooks/usePostpaging'

const SearchCategory = () => {
    const { slug } = useParams()
    const dispatch = useDispatch()
    const [category, setCategory] = useState(undefined)
    const isFetchedCategories = useSelector(state => state.CATEGORY.isFetched)
    const hashCategory = useSelector(state => state.CATEGORY.hashCategory)

    useEffect(() => {
        if (isFetchedCategories) {
            const foundId = Object.keys(hashCategory).find(categoryID => hashCategory[categoryID].slug === slug && hashCategory[categoryID].lang === 'vi')
            if (foundId) {
                setCategory(hashCategory[foundId])
            } else {
                setCategory(null)
            }
        }
    }, [isFetchedCategories, hashCategory, slug])

    const {
        posts,
        renderButtonLoadMore,
        toal
    } = usePostPaging({
        extraParams: { categories: category ? category.id : '' }
    })

    useEffect(() => {
        if (category) {

            dispatch(actFetchArticlesAsync({
                categories: category.id,
            }))
        }
    }, [category, dispatch])




    if (category === undefined) {
        return (
            <div className='articles-list section'>
                <div className='tcl-container'>
                    <div className='tcl-row tcl-jc-center'>
                        <IconLoading width='150px' />
                    </div>
                </div>
            </div>
        )
    }
    if (category === null) {
        return (
            <PageNotFound />
        )
    }

    // console.log('isFetchedCategories', isFetchedCategories);
    console.log('category', category);
    return (
        <div className='articles-list section'>
            <div className='tcl-container'>
                <MainTitle type='search'>{toal} kết quả tìm kiếm với danh mục "{slug}"</MainTitle>
                <div className='tcl-row tcl-jc-center'>
                    {
                        posts.map(postItem => (
                            <div className="tcl-col-12 tcl-col-md-8" key={postItem.id}>
                                <ArticleItem
                                    isStyleCard
                                    isShowCategoies
                                    isShowAvatar={false}
                                    isShowDesc={false}
                                    post={postItem}
                                />
                            </div>
                        ))
                    }
                </div>
                {
                    renderButtonLoadMore()
                }
            </div>
        </div>
    )
}

export default SearchCategory