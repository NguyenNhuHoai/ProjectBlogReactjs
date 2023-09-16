import dayjs from "dayjs"
import { AVATAR, DATE_TEMPLATE, MESSAGE_FORM_ERROR } from "../constants"
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/vi'

export function getQueryStr(name, location) {
  return new URLSearchParams(location.search).get(name)
}

export function mappingPostData(post) {
  return {
    id: post.id,
    title: post.title.rendered,
    author: post.author_data,
    authorId: post.author,
    thumbnail: post.featured_media_url,
    createDate: post.date,
    slug: post.slug,
    shortDescriptionHTML: post.content.rendered,
    categoriesId: post.categories,
    viewCount: post.view_count
  }
}

export function formatDescription(description) {
  const shortDes = description.replace('<p>', '').replace('</p>', '')

  let str = shortDes.split(' ').slice(0, 20).join(' ')

  if (str !== shortDes) {
    str += '...'
  }
  return (<p className="artcle-item__des">{str}</p>)
}

export function handleHashCategoryById(categories) {
  const hashObj = {}
  categories.forEach((categoryItem) => {
    const key = categoryItem.id

    hashObj[key] = {
      id: categoryItem.id,
      name: categoryItem.name,
      slug: categoryItem.slug,
      lang: categoryItem.lang
    }
  })
  return hashObj
}

export function validateFormdata({ value, name }) {
  let error = '';

  if (name === 'username' && !value) {
    error = MESSAGE_FORM_ERROR.username_required
  }
  if (name === 'password') {
    if (!value) {
      error = MESSAGE_FORM_ERROR.password_required
    } else if (value.length < 6) {
      error = MESSAGE_FORM_ERROR.password_length
    }
  }
  return error;
}

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export function validateFormRegister({ value, name }) {
  let error = ''
  if (name === 'email') {
    if (!value) {
      error = MESSAGE_FORM_ERROR.email_required
    } else if (!validateEmail(value)) {
      error = MESSAGE_FORM_ERROR.rest_user_invalid_email
    }
  } else if (name === 'username' && !value) {
    error = MESSAGE_FORM_ERROR.username_required
  } else if (name === 'password') {
    if (!value) {
      error = MESSAGE_FORM_ERROR.password_required
    } else if (value.length < 6) {
      error = MESSAGE_FORM_ERROR.password_length
    }
  }
  return error
}




export function mappingCurrentUser(user) {
  return {
    id: user.id,
    email: user.email,
    nickname: user.nickname,
    avatar: user.avatar_urls[96]
  }
}

export function hightlightText(queryStr, targetStr) {
  const reg = new RegExp(queryStr, 'gi');
  const finalStr = targetStr.replace(reg, str => {
    return '<mark>' + str + '</mark>'
  })
  return finalStr
}

export const mappingMainMenu = menuItems => {
  const data = {
    id: menuItems.ID,
    url: menuItems.url,
    title: menuItems.title,
    childItems: menuItems.child_items || []
  }
  data.childItems = data.childItems.map(mappingMainMenu)
  return data
}


export function mappingComment(commmentItem) {
  return {
    id: commmentItem.id,
    postId: commmentItem.post,
    parentId: commmentItem.parent,
    authorName: commmentItem.author_name,
    authorAvatar: commmentItem.author_avatar_urls || AVATAR,
    authorId: commmentItem.author,
    contentHTML: commmentItem.content.rendered,
    createdDate: commmentItem.date,
    replyCount: commmentItem.comment_reply_count
  }
}

export function mappingPostDetailData(post) {
  return {
    ...mappingPostData(post),
    tagsId: post.tags,
    contentHTML: post.content.rerendered,
    commentCount: post.comment_count,

  }
}

export function genUserLink(authorId) {
  return `/user/${authorId}`
}

export function getPostLink(slug) {
  return `/post/${slug}`
}


// FormatedDate
dayjs.extend(relativeTime)
dayjs.locale('vi')
export function formatedDate(date) {
  const createDateOjb = dayjs(date)

  const dateFormated = createDateOjb.format(DATE_TEMPLATE)
  const dateRelated = createDateOjb.fromNow()
  return { dateFormated, dateRelated }
}


