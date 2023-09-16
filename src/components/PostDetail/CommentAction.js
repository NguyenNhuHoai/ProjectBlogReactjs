import React from 'react'
import cls from 'classnames'
import IconLoading from '../shared/IconLoading'

const CommentAction = ({
    count,
    spacingTop,
    spacingBottom,
    parent,
    onClick,
    loading
}) => {
    function _onClick(evt) {
        evt.preventDefault()
        if (onClick) {
            onClick(evt)
        }
    }

    const classes = cls('comments__hidden', {
        'mt-1': spacingTop,
        'mb-1': spacingBottom,
        'pl-0': parent
    })

    const label = parent ? `Xem thêm ${count} bình luận` : `${count} Phản hồi`

    if (count === 0) return null

    return (
        <div className={classes}>
            <button onClick={_onClick}>
                <i className='icons ion-ios-redo'>
                    {label}
                    {loading && <IconLoading width='1em' />}
                </i>
            </button>
        </div>
    )
}

export default CommentAction