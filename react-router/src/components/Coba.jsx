import React, { useState, Fragment } from "react";
import { useLocation, Redirect } from "react-router-dom";
import axios from "axios";

const CheckOut = () => {
  const { state } = useLocation();
  const item = state.item;
  const [redirect, setRedirect] = useState(false);

  const checkout = (_id, quantity) => {
    console.log("id yang di checkout", _id);
    console.log("quantity nya", quantity);

    axios
      .delete(`http://localhost:4000/chart/checkout/${_id}`, {
        headers: { access_token: localStorage.getItem("access_token") },
        data: { quantity },
      })
      .then((result) => {
        console.log(result.data);
        setRedirect(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Fragment>
      {redirect && <Redirect to="/myChart" />}

      <div className="container-page-product">
        <div>
          <div className="card" id="detail-product">
            <img
              src={item.product.image_url}
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title">{item.product.name}</h5>
              <p className="card-text">{item.product.price}</p>
              <p className="card-text">{item.product.stock}</p>
              <p className="card-text">{item.quantity}</p>
            </div>

            <div>
              <button>
                <i
                  className="fa fa-shopping-cart"
                  aria-hidden="true"
                  onClick={() => checkout(item.product._id, item.quantity)}
                >
                  Checkout
                </i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default CheckOut;
