import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { getQueryStr, hightlightText } from '../../helpers';

export default function ArticleItemTitle({ title, slugLink }) {
  const location = useLocation()
  const queryStr = getQueryStr('q', location)
  const defaultTitle = "Nguyễn Như Hoài"

  return (
    <h2 className="article-item__title">
      {
        queryStr
          ?
          (<Link to={slugLink}>
            {
              title
                ?
                <span dangerouslySetInnerHTML={{
                  __html: hightlightText(queryStr, title)
                }}>
                </span>
                :
                <span dangerouslySetInnerHTML={{
                  __html: hightlightText(queryStr, defaultTitle)
                }}>
                </span>
            }
          </Link>)
          :
          <Link to={slugLink}>{title}</Link>
      }
    </h2>
  )
}