
import ArticleItem from "../components/ArticleItem";
import MainTitle from "../components/shared/MainTitle";
import { getQueryStr } from "../helpers";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { actFetchArticlesAsync } from "../store/post/actions";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { usePostPaging } from "../hooks/usePostpaging";

function SearchPage() {
  const dispatch = useDispatch()
  const location = useLocation()
  const queryStr = getQueryStr('q', location)

  const {
    posts,
    renderButtonLoadMore,
    toal
  } = usePostPaging({
    extraParams: { search: queryStr }
  })

  useEffect(() => {
    dispatch(actFetchArticlesAsync({
      search: queryStr,
      // perPage: 2
    }))
  }, [queryStr, dispatch])



  return (
    <div className="articles-list section">
      <div className="tcl-container">

        <MainTitle type="search">{toal} kết quả tìm kiếm với từ khóa "{queryStr}"</MainTitle>

        <div className="tcl-row tcl-jc-center">
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

export default SearchPage