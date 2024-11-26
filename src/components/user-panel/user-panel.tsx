import {Link, useNavigate} from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { logoutAction } from '../../store/api-actions';
import defaultAvatar from '../../images/avatar.svg';
import { useMemo } from 'react';

function UserPanel(): JSX.Element {
  const {authorizationStatus, userInfo} = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isUserAuthorized = authorizationStatus === AuthorizationStatus.Auth;

  const avatarStyle = useMemo(() => ({
    backgroundImage: `url(${isUserAuthorized && userInfo?.avatarUrl ? userInfo.avatarUrl : defaultAvatar})`,
  }), [isUserAuthorized, userInfo]);

  const handleSignInOutClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    if (isUserAuthorized) {
      dispatch(logoutAction());
      setTimeout(() => navigate(AppRoute.Root), 50);
    } else {
      navigate(AppRoute.Login);
    }
  };


  return (
    <ul className="header__nav-list">
      <li className="header__nav-item user">
        <Link className="header__nav-link header__nav-link--profile" to={isUserAuthorized ? AppRoute.Favorites : AppRoute.Login}>
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
