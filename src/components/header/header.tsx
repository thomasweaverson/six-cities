import Logo from '../logo/logo';
import UserPanel from '../user-panel/user-panel';

function Header(): JSX.Element {
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <Logo />
          <nav className="header__nav">
            <UserPanel />
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
