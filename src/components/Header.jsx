import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ReactComponent as IconCart3 } from 'bootstrap-icons/icons/cart3.svg';
import { ReactComponent as IconDoorClosedFill } from 'bootstrap-icons/icons/door-closed-fill.svg';
import { ReactComponent as IconHeartFill } from 'bootstrap-icons/icons/heart-fill.svg';
import { ReactComponent as IconPersonBadgeFill } from 'bootstrap-icons/icons/person-badge-fill.svg';
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../hooks/cart';
import logo from '../images/logo.svg';
import PreviewSearch from '../widgets/PreviewSearch';

const Header = () => {
  const { cart } = useCart();
  const totalItems = cart.reduce((total, p) => total + p.quantity, 0);
  return (
    <>
      <header className="p-3 border-bottom bg-light">
        <div className="container-fluid">
          <div className="row g-3">
            <div className="col-md-3 text-center">
              <Link to="/">
                <img alt="logo" src={logo} />
              </Link>
            </div>
            <div className="col-md-7">
              <PreviewSearch rfkId="rfkid_6" />
            </div>
            <div className="col-md-2">
              <div className="position-relative d-inline me-3">
                <Link to="/cart" className="btn btn-primary">
                  <IconCart3 className="i-va" />

                  {totalItems > 0 ? (
                    <div className="position-absolute top-0 start-100 translate-middle badge bg-danger rounded-circle">
                      {totalItems}
                    </div>
                  ) : (
                    ''
                  )}
                </Link>
              </div>
              <div className="btn-group">
                <button
                  type="button"
                  className="btn btn-secondary rounded-circle border me-3"
                  data-toggle="dropdown"
                  aria-expanded="false"
                  aria-label="Profile"
                  data-bs-toggle="dropdown"
                >
                  <FontAwesomeIcon icon={faUser} className="text-light" />
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to="/account/profile">
                      <IconPersonBadgeFill /> My Profile
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/account/wishlist">
                      <IconHeartFill className="text-danger" /> Wishlist
                    </Link>
                  </li>

                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/">
                      <IconDoorClosedFill className="text-danger" /> Logout
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
