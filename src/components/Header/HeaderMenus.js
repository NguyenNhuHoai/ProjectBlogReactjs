import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logOut } from '../../store/auth/actions';
import HeaderMainMenu from './HeaderMainMenu';

function HeaderMenus() {
  const currentUser = useSelector(state => state.AUTH.currentUser)
  const dispatch = useDispatch()
  function handleClickLogOut(evt) {
    evt.preventDefault()
    dispatch(logOut())
  }
  return (
    <div className="tcl-col-6">
      {/* Nav */}
      <div className="header-nav">
        <HeaderMainMenu />
        <ul className="header-nav__lists">
          {
            currentUser ?
              <li className="user">
                <Link to="/login">
                  <img src={currentUser.avatar} alt='' className="avatar avatar-person" /> {currentUser.nickname}
                </Link>
                <ul>
                  <li>
                    <Link to=''>Profile</Link>
                  </li>
                  <li>
                    <Link to='' onClick={handleClickLogOut}>Đăng xuất</Link>
                  </li>
                </ul>
              </li>
              :
              <li className="user">
                <Link to="/login">
                  <i className="icons ion-person" /> Tài khoản
                </Link>
              </li>
          }
        </ul>
      </div>
    </div>
  );
}

export default HeaderMenus;
