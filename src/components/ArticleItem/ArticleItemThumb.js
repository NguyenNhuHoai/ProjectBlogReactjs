import { Link } from 'react-router-dom';

export default function ArticleItemThumb({ thumbnail, slugLink }) {
  return (
    <div className="article-item__thumbnail">
      <Link to={slugLink}>
        <img src={thumbnail} alt={thumbnail} />
      </Link>
    </div>
  )
}