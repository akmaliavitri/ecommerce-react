import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <p className="navbar-brand">Ecommerce</p>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <Link to="/product">
              <li className="nav-item active">
                <p className="nav-link">Product</p>
              </li>
            </Link>
          </ul>

          <div>
            <Link to="/product/add">
              <button className="btn btn-primary" id="nav-btn-add">
                Add Product
              </button>
            </Link>
          </div>
          
          <div>
            <Link to="/myChart">
            <button className="btn btn-primary" id="nav-btn-add">
              <i
                className="fa fa-cart-plus "
                id="nav-add-chart"
                aria-hidden="true"
              >
                Chart
              </i>
            </button>
          </Link>
          </div>

          <div>
            <Link to="/signin">
              <button className="btn btn-dark" id="nav-btn-logout">
                Logout
              </button>
            </Link>
          </div>

        </div>
      </nav>
    </div>
  );
};

export default Navbar;
