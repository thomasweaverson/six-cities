import Logo from '../../components/logo/logo';
import {Link} from 'react-router-dom';

function NotFoundScreen(): JSX.Element {
  return (
    <>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <Logo />
          </div>
        </div>
      </header>
      <section className="not-found">
        <h1>404. Page not found</h1>
        <Link to="/">Вернуться на главную</Link>
      </section>
    </>
  );
}

export default NotFoundScreen;
