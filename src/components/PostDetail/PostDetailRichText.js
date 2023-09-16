
function PostDetailRichText({ post }) {
  // console.log(post.shortDescriptionHTML);
  return (
    <div className="rte" dangerouslySetInnerHTML={{ __html: post.shortDescriptionHTML }}>

    </div>
  )
}

export default PostDetailRichText