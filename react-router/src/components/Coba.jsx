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

          <p>
  <a class="btn btn-primary" data-toggle="collapse" href="#multiCollapseExample1" role="button" aria-expanded="false" aria-controls="multiCollapseExample1">Toggle first element</a>
  <button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#multiCollapseExample2" aria-expanded="false" aria-controls="multiCollapseExample2">Toggle second element</button>
  <button class="btn btn-primary" type="button" data-toggle="collapse" data-target=".multi-collapse" aria-expanded="false" aria-controls="multiCollapseExample1 multiCollapseExample2">Toggle both elements</button>
</p>

        </div>
      </nav>
    </div>
  );
};

export default Navbar;
