import './footer.css'

function Footer() {
  return (
    <footer id="footer" className="bg-white">
      <div className="tcl-container">
        <div className="footer">
          <div className="tcl-row">
            {/* Footer Column */}
            <div className="tcl-col-12 tcl-col-sm-6 tcl-col-md-4 tcl-col-lg-3">
              <div className="footer-logo">
                <img src="/assets/images/blog.png" alt="NuxtBlog Logo" />
              </div>
              <p>Personal project Blog</p>
            </div>
            {/* Footer Column */}
            <div className="tcl-col-12 tcl-col-sm-6 tcl-col-md-4 tcl-col-lg-2">
              <div className="footer-title">
                <p>Categories</p>
              </div>
              <ul className="footer-content__list">
                <li><a href="/">ReactJs</a></li>
                <li><a href="/">Javascript</a></li>
                <li><a href="/">Angular</a></li>
                <li><a href="/">HTML, HTML5</a></li>
              </ul>
            </div>
            {/* Footer Column */}
            <div className="tcl-col-12 tcl-col-sm-6 tcl-col-md-4 tcl-col-lg-3">
              <div className="footer-title">
                <p>Liên hệ</p>
              </div>
              <ul className="footer-content__list">
                <li>Họ và tên: Nguyễn Như Hoài</li>
                <li>SĐT: 0376681557</li>
                <li>Gmail: nguyennhuhoai745@gmail.com</li>
                <li>Địa chỉ: 49 đường số 14, Linh Chiểu, Tp.Thủ Đức, Tp.Hồ Chí Minh</li>
              </ul>
            </div>
            {/* Footer Column */}
            <div className="tcl-col-12 tcl-col-sm-6 tcl-col-md-4 tcl-col-lg-4">
              <div className="footer-title">
                <p>Hỗ trợ</p>
              </div>
              <div className="footer-facebook">
                <div className="fb-page" data-href="/" data-tabs data-width data-height data-small-header="false" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="true">
                  <blockquote cite="/" className="fb-xfbml-parse-ignore">
                    <a href="/">Trung tâm lập trình Zendvn</a>
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>

  )
}

export default Footer