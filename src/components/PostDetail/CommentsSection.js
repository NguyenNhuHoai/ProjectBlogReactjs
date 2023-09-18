import React from 'react'
import { formatedDate, genUserLink } from '../../helpers';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const CommentsSection = ({ comment, onRepLyClick }) => {
    const { authorAvatar, authorId, authorName, contentHTML, createdDate } = comment
    const { dateFormated, dateRelated } = formatedDate(createdDate, true)
    const authorLink = genUserLink(authorId)
    return (
        <div className="comments__section">
            <div className="comments__section--avatar">
                <Link to={authorLink}>
                    <img src={authorAvatar} alt={authorName} />
                </Link>
            </div>
            <div className="comments__section--content">
                <a href="/" className="comments__section--user">{authorName}</a>
                <p className="comments__section--time" title={dateRelated}>{dateFormated}</p>
                <div
                    className="comments__section--text"
                    dangerouslySetInnerHTML={{ __html: contentHTML }}
                ></div>
                {
                    comment.parentId === 0 && <i className="ion-reply comments__section--reply" onClick={onRepLyClick}></i>
                }
            </div>
        </div>
    )
}

export default CommentsSection