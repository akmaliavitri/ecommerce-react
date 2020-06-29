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
          <div className="container " >
            <div className="col py-3 px-lg-5 px-lg-5 d-flex justify-content-center align-items-center">
              <div className="row mx-lg-n5" style={{backgroundColor : '#FF613A'}}>
                <div className="col py-3 px-lg-5 border">
                  <img
                    id="signupimg"
                    src={item.product.image_url}
                    className="imagecheckout"
                    alt="..."
                  />
                </div>
                <div className="col py-3 px-lg-5 border">
                  <div className="colregis">
                    <div className="card p-4">
                      <div className="form-gorup">
                        <label> Product Name :</label>
                        <input
                          disabled={true}
                          className="form-control"
                          value={item.product.name}
                        />
                      </div>
                      <div className="form-gorup">
                        <label> Price :</label>
                        <input
                          disabled={true}
                          className="form-control"
                          value={item.product.price}
                        />
                      </div>
                      <div className="form-gorup">
                        <label> Stock :</label>
                        <input
                          disabled={true}
                          className="form-control"
                          value={item.product.stock}
                        />
                      </div>
                      <div className="form-gorup">
                        <label> Quantity :</label>
                        <input
                          disabled={true}
                          className="form-control"
                          value={item.quantity}
                        />
                      </div>{" "}
                      <br />
                      <div>
                        <button className="btn btn-primary">
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
      </div>
    </Fragment>
  );
};

export default CheckOut;
