import { formatDescription } from "../../helpers"


export default function ArticleItemDesc({ description }) {
  const des = formatDescription(description)
  return (
    <div className="article-item__desc">{des}</div>
  )
}