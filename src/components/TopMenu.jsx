import { Link } from 'react-router-dom';
import uriLookupTable from '../data/categoriesMenu.json';

const TopMenu = () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-0">
    <div className="container-fluid">
      <Link className="navbar-brand" to="/">
        E-Commerce
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav">
          {Object.keys(uriLookupTable).map((k) => (
            <li className="nav-item" key={k}>
              <Link className="nav-link" to={k}>
                {uriLookupTable[k].title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </nav>
);

export default TopMenu;
