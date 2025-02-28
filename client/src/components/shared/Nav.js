import React from 'react';
import { Link } from 'react-router-dom';
import { Fragment } from 'react';

function Nav ({user}) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success fixed-top">
      <Link to="/" className="navbar-brand">Shoppy.com</Link>

      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">

          <li className="nav-item">
            <Link to="/shoptify" className="nav-link">Products</Link>
          </li>
          {user ? (
          <li className="nav-item dropdown">
            <a href="" className="nav-link dropdown-toggle" id="blogsDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              My Cart
            </a>
            <div className="dropdown-menu" aria-labelledby="blogsDropdown">
                <Fragment>
                  <Link to="/cart" className="dropdown-item">View Cart</Link>
                  <div className="dropdown-divider"></div>
                  <Link to="#" className="dropdown-item">Order History</Link>
                </Fragment>          
            </div>
          </li>
            ) : null}
        </ul>
      
        <ul className="navbar-nav">
          {user ? (
            <li className="nav-item">
              <Link to="/logout" className="nav-link">
                <i className="fa fa-sign-out"></i>
                Logout
              </Link>
            </li>
          ) : (
            <Fragment>
              <li className="nav-item">
                <Link to="/users/new" className="nav-link">
                  <i className="fa fa-user-plus"></i>
                  Register
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/login" className="nav-link">
                  <i className="fa fa-sign-in"></i>
                  Login
                </Link>
              </li>
            </Fragment>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Nav;