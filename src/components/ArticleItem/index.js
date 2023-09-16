import './article-item.css';
import cls from 'classnames';
import ArticleItemDesc from './ArticleItemDesc';
import ArticleItemThumb from './ArticleItemThumb';
import ArticleItemTitle from './ArticleItemTitle';
import ArticleItemInfo from './ArticleItemInfo';
import ArticleItemCategories from './ArticleItemCategories';
import ArticleItemStats from './ArticleItemStats';
import { genUserLink, getPostLink } from '../../helpers';

export default function ArticleItem({
  isStyleRow = false,
  isStyleCard = false,
  isShowDesc = false,
  isShowCategoies = false,
  isShowAvatar = true,
  post,
}) {
  if (!post) {
    return
  }
  const classes = cls('article-item', {
    'style-card': isStyleCard,
    'style-row': isStyleRow,
  })

  const slugLink = getPostLink(post?.slug)
  const slugAuthorLink = genUserLink(post?.authorId)
  const categoriesId = post.categoriesId

  return (
    <article className={classes}>
      <ArticleItemThumb thumbnail={post?.thumbnail} slugLink={slugLink} />
      <div className="article-item__content">

        {isShowCategoies && <ArticleItemCategories categoriesId={categoriesId} />}
        {isShowCategoies && <ArticleItemStats viewCount={post.viewCount} categoriesId={categoriesId} />}

        <ArticleItemTitle title={post?.title} slugLink={slugLink} />

        {isShowDesc && <ArticleItemDesc description={post?.shortDescriptionHTML} />}

        <ArticleItemInfo isShowAvatar={isShowAvatar} author={post?.author} slugAuthorLink={slugAuthorLink} date={post?.createDate} />
      </div>
    </article>
  )
}