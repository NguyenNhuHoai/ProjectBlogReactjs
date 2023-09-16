import React from 'react'
import Button from '../shared/Button'

const PageNotFound = () => {
    return (
        <div className='articles-list section'>
            <div className='tcl-container'>
                <div className='tcl-row tcl-jc-center'>
                    <div className='tcl-col-3'>
                        <img src='https://www.elegantthemes.com/blog/wp-content/uploads/2020/02/000-404.png' alt='404'></img>
                    </div>
                    <div className='tcl-col-5'>
                        <h2>Truy cập của bạn có thể đang bị lỗi hoặc không tìm thấy nội dung</h2>
                        <Button href="/" as='a'>Trở về trang chủ</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PageNotFound