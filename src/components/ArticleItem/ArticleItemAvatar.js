import { Link } from "react-router-dom/cjs/react-router-dom";
import { AVATAR } from "../../constants";

export default function ArticleItemAvatar({ avatar, slugAuthorLink, nickname }) {
  return (
    <div className="article-item__author-image">
      <Link aria-label="John Doe" to={slugAuthorLink}>
        <img src={avatar ? avatar : AVATAR} alt={nickname} />
      </Link>
    </div>
  )
}