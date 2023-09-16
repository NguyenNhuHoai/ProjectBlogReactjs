// import { useSelector } from "react-redux"
// import { Link } from "react-router-dom/cjs/react-router-dom.min";

function PostDetailTags({ post }) {
  // const { tagsId } = post
  // const categories = useSelector((state) => state.CATEGORY.hashCategory)
  // console.log('categories', categories);
  return (
    <div className="post-detail__tags">
      <h2>Tags</h2>
      <ul>
        <li className="item"><a href="/" className="btn btn-default">HTML</a></li>
        <li className="item"><a href="/" className="btn btn-default">CSS3</a></li>
        <li className="item"><a href="/" className="btn btn-default">React</a></li>
        <li className="item"><a href="/" className="btn btn-default">Vue</a></li>
        {/* {
          tagsId.map(cateId => {
            const category = categories[cateId]
            if (!category) {
              return null
            }
            const categorySlugLink = '/category' + category.slug
            return <li className="item"><Link to={categorySlugLink} className="btn btn-default">{category.name}</Link></li>
          })

        } */}
      </ul>
    </div>
  )
}

export default PostDetailTags