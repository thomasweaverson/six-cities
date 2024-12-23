import {Link, useNavigate} from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import defaultAvatar from '../../images/avatar.svg';
import { useMemo } from 'react';
import { getAuthorizationStatus, getUserInfo } from '../../store/user-process/selectors';
import { logout } from '../../store/action';

function UserPanel(): JSX.Element {
  const userInfo = useAppSelector(getUserInfo);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isUserAuthorized = authorizationStatus === AuthorizationStatus.Auth;

  const avatarStyle = useMemo(() => ({
    backgroundImage: `url(${isUserAuthorized && userInfo?.avatarUrl ? userInfo.avatarUrl : defaultAvatar})`,
  }), [isUserAuthorized, userInfo]);

  const handleSignInOutClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    if (isUserAuthorized) {
      dispatch(logout());
      setTimeout(() => navigate(AppRoute.Root), 50);
    } else {
      navigate(AppRoute.Login);
    }
  };


  return (
    <ul className="header__nav-list">
      <li className="header__nav-item user">
        <Link className="header__nav-link header__nav-link--profile" to={isUserAuthorized ? AppRoute.Favorite : AppRoute.Login}>
          <div
            style={avatarStyle}
            className="header__avatar-wrapper user__avatar-wrapper"
          >
          </div>
          {isUserAuthorized && userInfo?.email && (
            <span className="header__user-name user__name">{userInfo.email}</span>
          )}
        </Link>
      </li>
      <li className="header__nav-item">
        <a className="header__nav-link" href="#/" onClick={handleSignInOutClick}>
          <span className="header__signout">{isUserAuthorized ? 'Sign out' : 'Sign in'}</span>
        </a>
      </li>
    </ul>
  );
}

export default UserPanel;
