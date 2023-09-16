import './latest-news-list.css'
import ArticleItem from "../ArticleItem";
import MainTitle from '../shared/MainTitle'
import { useSelector } from 'react-redux';

function ArticleLatest() {
  const posts = useSelector(state => state.POST.articleLates)

  return (
    <div className="latest-news section">
      <div className="tcl-container">

        <MainTitle />

        <div className="latest-news__list spacing">
          {
            posts?.map(post =>
              <div key={post.id} className="latest-news__card">
                <ArticleItem post={post} />
              </div>)
          }
        </div>
      </div>
    </div>

  )
}

export default ArticleLatest