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

      <div>
        <div className="container-regis">
          <div className="container px-lg-5">
            <div className="row mx-lg-n5">
              <div className="col py-3 px-lg-5 border bg-light">
                <img
                  id="signupimg"
                  src={item.product.image_url}
                  className="card-img-top"
                  alt="..."
                />
              </div>
              <div className="col py-3 px-lg-5 border bg-light">
                <div className="colregis">
                  <div className="card p-4">
                    <div className="form-gorup">
                      <label> Product Name :</label>
                      <input
                        className="form-control"
                        value={item.product.name}
                      />
                    </div>

                    <div className="form-gorup">
                      <label> Price :</label>
                      <input
                        className="form-control"
                        value={item.product.price}
                      />
                    </div>

                    <div className="form-gorup">
                      <label> Stock :</label>
                      <input
                        className="form-control"
                        value={item.product.stock}
                      />
                    </div>

                    <div className="form-gorup">
                      <label> Quantity :</label>
                      <input className="form-control" value={item.quantity} />
                    </div>

                    <div>
                      <button>
                        <i
                          className="fa fa-shopping-cart"
                          aria-hidden="true"
                          onClick={() =>
                            checkout(item.product._id, item.quantity)
                          }
                        >
                          Checkout
                        </i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default CheckOut;
